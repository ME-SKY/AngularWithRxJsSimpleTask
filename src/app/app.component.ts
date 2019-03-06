import {Component, OnInit, OnDestroy} from '@angular/core';
import {fromEvent} from 'rxjs';
import {filter, pairwise, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  observableWindow: any;

  ngOnInit(): void {
    const managePanel = document.getElementById('manage_panel');
    const editor = document.getElementById('editor');
    const scrollStartPoint = editor.offsetTop - managePanel.clientHeight;

    this.observableWindow = fromEvent(window, 'scroll')
      .pipe(
        map(() => window.pageYOffset),
        pairwise(),
        filter((pair) => {
          if (pair[0] < pair[1]) {
            return (pair[0] > scrollStartPoint && pair[1] > scrollStartPoint);
          } else {
            return pair[0] < editor.offsetTop && pair[1] < editor.offsetTop;
          }
        }))
      .subscribe((e) => {
        if (window.pageYOffset >= managePanel.offsetTop) {
            managePanel.classList.add('shadow_down', 'sticky');
          } else {
            managePanel.classList.remove('shadow_down', 'sticky');
          }
      }
    );
  }

  ngOnDestroy(): void {
    this.observableWindow.unsubscribe();
  }
}
