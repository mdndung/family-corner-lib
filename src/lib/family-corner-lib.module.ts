import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { FamilyCornerLibComponent } from './family-corner-lib.component';
import { HttpClientModule } from '@angular/common/http';
import { FamilyCornerLibService } from './family-corner-lib.service';


export interface LibConfig {
  apiUrl: string;
}

export const LibConfigService = new InjectionToken<LibConfig>('LibConfig');

@NgModule({
  declarations: [
    FamilyCornerLibComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule  ],
  exports: [
    FamilyCornerLibComponent
  ]
})
export class FamilyCornerLibModule {
  static forRoot(config: LibConfig): ModuleWithProviders<FamilyCornerLibModule> {
    return {
      ngModule: FamilyCornerLibModule,
      providers: [
        FamilyCornerLibService,
        {
          provide:LibConfigService,
          useValue: config
        }
      ]
    }
  }
}
