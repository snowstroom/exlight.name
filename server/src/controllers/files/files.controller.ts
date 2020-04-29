import { Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { META_ACCESS_KEY, META_ENTITY_KEY } from 'server/src/consts/meta-keys';
import { AccessNamespace } from 'share';

@Controller({ path: 'api/files' })
@UseGuards(AuthGuard)
export class FilesController {
  @Post('/upload')
  @SetMetadata(META_ACCESS_KEY, AccessNamespace.CREATE)
  @SetMetadata(META_ENTITY_KEY, AccessNamespace.E_ENTITY_TYPES.files)
  public async uploadFile() {}

  @Get('/:id')
  public async getFile() {}
}
