import { NgModule } from '@angular/core';
import { SafehtmlPipe } from './safehtml/safehtml';
@NgModule({
	declarations: [SafehtmlPipe],
	imports: [],
	exports: [SafehtmlPipe]
})
export class PipesModule {}
