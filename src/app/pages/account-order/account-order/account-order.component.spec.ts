import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent, MockPipe } from 'ng-mocks';

import { DatePipe } from 'ish-core/pipes/date.pipe';
import { BasketMockData } from 'ish-core/utils/dev/basket-mock-data';
import { AddressComponent } from 'ish-shared/components/address/address/address.component';
import { BasketCostSummaryComponent } from 'ish-shared/components/basket/basket-cost-summary/basket-cost-summary.component';
import { LineItemListComponent } from 'ish-shared/components/basket/line-item-list/line-item-list.component';
import { InfoBoxComponent } from 'ish-shared/components/common/info-box/info-box.component';

import { AccountOrderComponent } from './account-order.component';

describe('Account Order Component', () => {
  let component: AccountOrderComponent;
  let fixture: ComponentFixture<AccountOrderComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountOrderComponent,
        MockComponent(AddressComponent),
        MockComponent(BasketCostSummaryComponent),
        MockComponent(FaIconComponent),
        MockComponent(InfoBoxComponent),
        MockComponent(LineItemListComponent),
        MockPipe(DatePipe),
      ],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.order = BasketMockData.getOrder();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should be rendered without errors if no order is available', () => {
    component.order = undefined;
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should render order details for the given order', () => {
    fixture.detectChanges();

    expect(element.querySelector('[data-testing-id=order-summary-info]')).toBeTruthy();
    expect(element.querySelectorAll('ish-info-box')).toHaveLength(4);
    expect(element.querySelector('ish-line-item-list')).toBeTruthy();
    expect(element.querySelector('ish-basket-cost-summary')).toBeTruthy();
  });

  it('should display the home link after creation', () => {
    fixture.detectChanges();
    expect(element.querySelector('[data-testing-id="home-link"]')).toBeTruthy();
  });

  it('should display the order list link after creation', () => {
    fixture.detectChanges();
    expect(element.querySelector('[data-testing-id="orders-link"]')).toBeTruthy();
  });
});
