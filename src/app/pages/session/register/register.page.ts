import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../services/register.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../../components/ticket_menu/popover/popover.component';
import { SwalService } from 'src/app/services/swal.service';
import { Client } from 'src/app/models/client.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  protected user: Client = new Client();
  constructor(
    private registerService: RegisterService,
    private popov: PopoverController,
    private swal: SwalService
  ) { }

  async presentPopover(ev: any) {
    const popover = await this.popov.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

  ngOnInit() {
  }
  async registerClient() {
    await this.registerService.registerClient(this.user) ?
    (this.swal.fireSuccess("Tu cuenta será verificada por los administradores."))
    :
    (this.swal.fireError("Hubo un error al registrar tu usuario, intenta más tarde o contacta a soporte."))
  }
}
