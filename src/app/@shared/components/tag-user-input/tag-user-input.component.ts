import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tag-user-input',
  templateUrl: './tag-user-input.component.html',
  styleUrls: ['./tag-user-input.component.scss'],
})
export class TagUserInputComponent implements OnChanges, OnDestroy {
  @Input('value') value: string = '';
  @Input('placeholder') placeholder: string = 'ss';
  @Input('isShowMetaPreview') isShowMetaPreview: boolean = true;
  @Input('isAllowTagUser') isAllowTagUser: boolean = true;
  @Output('onDataChange') onDataChange: EventEmitter<any> =
    new EventEmitter<any>();

  @ViewChild('tagInputDiv', { static: false }) tagInputDiv: ElementRef;
  @ViewChild('userSearchDropdownRef', { static: false, read: NgbDropdown })
  userSearchNgbDropdown: NgbDropdown;

  ngUnsubscribe: Subject<void> = new Subject<void>();
  metaDataSubject: Subject<void> = new Subject<void>();

  userList: any = [];
  userNameSearch = '';
  metaData: any = {};
  apiUrl = environment.apiUrl + 'customers/';
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private commonService: CommonService
  ) {
    this.metaDataSubject.pipe(debounceTime(300)).subscribe(() => {
      this.getMetaDataFromUrlStr();
      this.checkUserTagFlag();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const val = changes?.['value']?.currentValue;
    this.setTagInputDivValue(val);

    if (val === '') {
      this.clearUserSearchData();
      this.clearMetaData();
    } else {
      this.getMetaDataFromUrlStr();
      this.checkUserTagFlag();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.metaDataSubject.next();
    this.metaDataSubject.complete();
  }

  messageOnKeyEvent(): void {
    this.metaDataSubject.next();
    this.emitChangeEvent();
  }

  // checkUserTagFlag(): void {
  //   if (this.isAllowTagUser) {
  //     const htmlText = this.tagInputDiv?.nativeElement?.innerHTML || '';

  //     const atSymbolIndex = htmlText.lastIndexOf('@');

  //     if (atSymbolIndex !== -1) {
  //       this.userNameSearch = htmlText.substring(atSymbolIndex + 1);
  //       if (this.userNameSearch?.length > 2) {
  //         this.getUserList(this.userNameSearch);
  //       } else {
  //         this.clearUserSearchData();
  //       }
  //     } else {
  //       this.clearUserSearchData();
  //     }
  //   }
  // }

  checkUserTagFlag(): void {
    this.userList = [];
    if (this.isAllowTagUser) {
      let htmlText = this.tagInputDiv?.nativeElement?.innerHTML || '';

      // Remove HTML tags to get the clean text content
      const anchorTagRegex =
        /<a\s+href="\/settings\/view-profile\/(\d+)"\s+class="text-danger"\s+data-id="\d+">@([\w\s]+)<\/a>/g;

      // Remove anchor tags with @username (ignore them)
      htmlText = htmlText.replace(anchorTagRegex, '');

      const atSymbolRegex = /@/g;
      const matches = [...htmlText.matchAll(atSymbolRegex)];
      const cursorPosition = this.getCursorPosition(); // Get cursor position

      if (matches.length > 0) {
        let foundValidTag = false; // Flag to track if a valid tag is found

        // Iterate through all the @ matches
        for (const match of matches) {
          const atSymbolIndex = match.index;

          // Only check the text between the @ symbol and the cursor
          console.log('Index==>', cursorPosition, atSymbolIndex);

          if (cursorPosition > atSymbolIndex) {
            // Extract text from the @ symbol to the cursor or to the next space
            let textAfterAt = htmlText
              .substring(atSymbolIndex + 1, cursorPosition)
              .trim();
            textAfterAt = textAfterAt.replace(/<[^>]*>/g, ''); // Remove HTML tags
            textAfterAt = textAfterAt.replace(/[^\w\s]/g, ''); // Remove special characters except alphanumeric and spaces
            const currentPositionValue = textAfterAt.split(' ')[0].trim(); // Stop at the first space

            // Proceed if there is actual content typed after the @ symbol
            if (currentPositionValue.length > 0) {
              this.userNameSearch = currentPositionValue; // This is the user name search text
              console.log('username:', this.userNameSearch);

              foundValidTag = true;
            }
          }
        }

        // After checking for @ and capturing the text, proceed to fetch user list
        if (
          foundValidTag &&
          this.userNameSearch &&
          this.userNameSearch.length > 2
        ) {
          this.getUserList(this.userNameSearch); // Fetch the user list based on search
        } else {
          this.clearUserSearchData(); // Clear the search data if no valid tag or input is too short
        }
      } else {
        console.log('No "@" symbol found.');
      }
    }
  }

  // Method to get the cursor position
  getCursorPosition(): number {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange(); // Create a clone of the current selection range
      preCaretRange.selectNodeContents(this.tagInputDiv.nativeElement); // Select the contents of the contenteditable div
      preCaretRange.setEnd(range.endContainer, range.endOffset); // Set the end to the current selection position
      return preCaretRange.toString().length; // Return the length of the text up to the cursor position
    }
    return -1; // If no selection, return -1
  }

  getMetaDataFromUrlStr(): void {
    const htmlText = this.tagInputDiv?.nativeElement?.innerHTML || '';
    const text = htmlText.replace(/<[^>]*>/g, '');
    // const matches = htmlText.match(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/gi);
    const matches = text.match(/(?:https?:\/\/|www\.)[^\s]+/g);
    const url = matches?.[0];
    if (url) {
      if (!url?.includes(this.metaData?.url)) {
        this.spinner.show();
        this.ngUnsubscribe.next();

        this.commonService
          .getMetaData({ url })
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe({
            next: (res: any) => {
              if (res?.meta?.image) {
                const urls = res.meta?.image?.url;
                const imgUrl = Array.isArray(urls) ? urls?.[0] : urls;

                this.metaData = {
                  title: res?.meta?.title,
                  metadescription: res?.meta?.description,
                  metaimage: imgUrl,
                  metalink: res?.meta?.url || url,
                  url: url,
                };

                this.emitChangeEvent();
              }

              this.spinner.hide();
            },
            error: () => {
              this.clearMetaData();
              this.spinner.hide();
            },
          });
      }
    } else {
      this.clearMetaData();
    }
  }

  moveCursorToEnd(): void {
    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(
      this.tagInputDiv?.nativeElement,
      this.tagInputDiv?.nativeElement.childNodes.length
    );
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // selectTagUser(user: any): void {
  //   const htmlText = this.tagInputDiv?.nativeElement?.innerHTML || '';

  //   const text = htmlText.replace(
  //     `@${this.userNameSearch}`,
  //     `<a href="/settings/view-profile/${user?.Id}" class="text-danger" data-id="${user?.Id}">@${user?.Username}</a>`
  //   );
  //   this.setTagInputDivValue(text);
  //   this.emitChangeEvent();
  //   this.moveCursorToEnd();
  // }

  selectTagUser(user: any): void {
    const htmlText = this.tagInputDiv?.nativeElement?.innerHTML || '';

    // Save the cursor position
    const savedRange = this.saveCursorPosition();

    const replaceUsernamesInTextNodesAtCursor = (
      html: string,
      userName: string,
      userId: string,
      displayName: string
    ) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const cursorPosition = this.getCursorPosition(); // Get the cursor position in the text

          // Find the nearest @ mention before the cursor
          const regex = /@/g;
          const match = regex.exec(node.nodeValue || '');

          if (match && match.index <= cursorPosition) {
            const atSymbolIndex = match.index;

            // Replace only at the position of the found @ mention
            const replacement = `<a href="/settings/view-profile/${userId}" class="text-danger" data-id="${userId}">@${displayName}</a>`;
            const beforeText = node.nodeValue?.substring(0, atSymbolIndex);
            const afterText = node.nodeValue?.substring(cursorPosition);

            // Replace @ mention with the link
            const replacedText = `${beforeText}${replacement}${afterText}`;
            const span = document.createElement('span');
            span.innerHTML = replacedText;

            // Insert the new HTML in place of the text node
            while (span.firstChild) {
              node.parentNode?.insertBefore(span.firstChild, node);
            }
            node.parentNode?.removeChild(node);
          }
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.nodeName.toLowerCase() !== 'a'
        ) {
          node.childNodes.forEach((child) => walk(child));
        }
      };

      doc.body.childNodes.forEach((child) => walk(child));
      return doc.body.innerHTML;
    };

    // Call the function to replace @ mention at the current cursor position
    const text = replaceUsernamesInTextNodesAtCursor(
      htmlText,
      this.userNameSearch,
      user?.Id,
      user?.Username.split(' ').join('')
    );
    this.setTagInputDivValue(text);
    this.restoreCursorPosition(savedRange);
    this.emitChangeEvent();
    this.moveCursorToEnd();
  }

  saveCursorPosition(): Range | null {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0).cloneRange(); // Clone the range to save it
    }
    return null;
  }

  // Restore saved cursor position
  restoreCursorPosition(savedRange: Range | null): void {
    if (savedRange) {
      const selection = window.getSelection();
      selection.removeAllRanges(); // Clear any existing ranges
      selection.addRange(savedRange); // Restore the saved range
    }
  }

  getUserList(search: string): void {
    this.commonService
      .get(`${this.apiUrl}search-user?searchText=${search}`)
      .subscribe({
        next: (res: any) => {
          if (res?.data?.length > 0) {
            this.userList = res.data;
            this.userSearchNgbDropdown?.open();
          } else {
            this.clearUserSearchData();
          }
        },
        error: () => {
          this.clearUserSearchData();
        },
      });
  }

  clearUserSearchData(): void {
    this.userNameSearch = '';
    this.userList = [];
    this.userSearchNgbDropdown?.close();
  }

  clearMetaData(): void {
    this.metaData = {};
    this.emitChangeEvent();
  }

  setTagInputDivValue(htmlText: string): void {
    if (this.tagInputDiv) {
      this.renderer.setProperty(
        this.tagInputDiv.nativeElement,
        'innerHTML',
        htmlText
      );
    }
  }

  emitChangeEvent(): void {
    if (this.tagInputDiv) {
      // console.log(this.tagInputDiv);
      const htmlText = this.tagInputDiv?.nativeElement?.innerHTML;
      this.value = `${htmlText}`.replace(/\<div\>\<br\>\<\/div\>/gi, '');

      this.onDataChange.emit({
        html: htmlText,
        tags: this.tagInputDiv?.nativeElement?.children,
        meta: this.metaData,
      });
    }
  }
}
