import {Component, OnInit, OnDestroy} from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  observableWindow: any;

  ngOnInit(): void {
    const managePanel = document.getElementById('manage_panel');
    this.observableWindow = fromEvent(window, 'scroll').subscribe(() => {
        if (window.pageYOffset > managePanel.offsetTop) {
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
