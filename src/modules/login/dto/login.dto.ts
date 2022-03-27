import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'username', type: String, required: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ name: 'passwd', type: String, required: true })
  passwd: string;

  // @ApiProperty({ type: 'string', format: 'binary' })
  // file: any;
}
