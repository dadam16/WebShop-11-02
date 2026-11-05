import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CreateRendelesDto } from './createRendeles.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App',
    };
  }

  @Get('webshop')
  @Render('webshop')
  getWebshopForm() {}

  @Post('webshop')
  @Render('webshop')
  postRendeles(@Body() body: CreateRendelesDto) {
    const errors: string[] = [];

    if (!body.nev) {
      errors.push('Kötelező megadni a nevet');
    }

    if (!body.orszag) {
      errors.push('Kötelező megadni');
    }

    if (!body.iranyitoszam) {
      errors.push('Kötelező megadni az irányítószámot');
    } else {
      const iranyitoSzam = Number(body.iranyitoszam);
      if (isNaN(iranyitoSzam)) {
        errors.push('Számnak kell lennie');
      } else if (iranyitoSzam < 0) {
        errors.push('Nem lehet kisebb 0-nál');
      }
    }

    if (!body.varos) {
      errors.push('Kotelező megadni a várost');
    }

    if (!body.utca) {
      errors.push('Kötelező megadni az utcát');
    }

    if (!body.hazszam) {
      errors.push('Kötelező megadni a házszámot');
    } else {
      const hazSzam = Number(body.hazszam);
      if (isNaN(hazSzam)) {
        errors.push('Számnak kell lennie');
      } else if (hazSzam >= 0) {
        errors.push('Nem lehet kisebb mint 0');
      }
    }

    if (!body.bankkartyaszam) {
      errors.push('Kötelező megadni a bankkártyaszámot');
    } else if (
      /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/.test(body.bankkartyaszam)
    ) {
      errors.push('A megadott formátumban kell megadni');
    }

    if (!body.lejaratidatum) {
      errors.push('Kötelező megadni lejáratidatumot');
    }

    if (!body.biztonsagikod) {
      errors.push('Kötelező megadni a biztonsági kódot');
    } else if (/^[0-9]{3}$/.test(body.lejaratidatum)) {
      errors.push('A megadott formátumú legyen');
    }

    if(errors.length > 0) {
      return {
        errors,
        body
      };
    } else {
      return {
        succes: true,
      };
    }
  }
}
