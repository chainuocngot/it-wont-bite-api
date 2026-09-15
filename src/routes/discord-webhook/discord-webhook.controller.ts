import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { type Response } from 'express';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  ConnectCallbackQueryDto,
  GetConnectUrlQueryDto,
  GetConnectUrlResDto,
} from 'src/routes/discord-webhook/discord-webhook.dto';
import { DiscordWebhookService } from 'src/routes/discord-webhook/discord-webhook.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { IsPublic } from 'src/shared/decorators/auth.decorator';
import { UserType } from 'src/shared/models/user.model';

@ApiBearerAuth()
@Controller('discord-webhook')
export class DiscordWebhookController {
  constructor(private readonly discordWebhookService: DiscordWebhookService) {}

  @Get('connect')
  @ZodSerializerDto(GetConnectUrlResDto)
  connect(@ActiveUser('userId') userId: UserType['id'], @Query() query: GetConnectUrlQueryDto) {
    return this.discordWebhookService.getConnectUrl(userId, query);
  }

  @Get('connect/callback')
  @IsPublic()
  async callback(@Query() query: ConnectCallbackQueryDto, @Res() res: Response) {
    const redirectUrl = await this.discordWebhookService.callback(query);

    return res.redirect(redirectUrl);
  }
}
