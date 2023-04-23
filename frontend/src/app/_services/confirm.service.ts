import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { InformativeDialogComponent } from '../modals/informative-dialog/informative-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModelRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title = 'Confirmation',
          message = 'Are you sure you want to do this? When you choose yes than any change is lose!',
          btnOkText = 'Ok',
          btnCancelText = 'Cancel'): Observable<boolean> {
      const config = {
        initialState: {
          title,
          message,
          btnOkText,
          btnCancelText
        }
      };
      this.bsModelRef = this.modalService.show(ConfirmDialogComponent, config);

      return new Observable<boolean>(this.getResult());
  }

  private getResult(): (observer: any) => {unsubscribe(): void} {
    return (observer) => {
      const subscription = this.bsModelRef.onHidden.subscribe(() => {
        observer.next(this.bsModelRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe(): void {
          subscription.unsubscribe();
        }
      };
    };
  }

  informative(): void {
    const initialState = {
      title: 'Hi!'
    };
    this.bsModelRef = this.modalService.show(InformativeDialogComponent, {initialState});
    this.bsModelRef.content.closeBtnName = 'Close';
  }
}
