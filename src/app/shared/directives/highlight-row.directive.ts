import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightRow]'
})
export class HighlightRowDirective {
  @Input() appHighlightRow: string = '#acd6ff';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBgColor(this.appHighlightRow);
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.2s ease');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBgColor(null);
  }

  private changeBgColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}