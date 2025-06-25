import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('connection')
export class ConnectionController {
  @ApiOperation({ summary: 'Retrieve all connections for user.' })
  @Get(':id')
  @HttpCode(200)
  async getAllConnections(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return response.json();
  }
}
