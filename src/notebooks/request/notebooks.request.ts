import { ApiProperty, getSchemaPath,  } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddNotebooksRequest {
  @IsString()
  @ApiProperty()
  name: string;
}

export class UpdateNotebooksRequest {
  @ApiProperty()
  id: number;

@IsString()
  @IsOptional()
  @ApiProperty()
  name: string;
}

export class DeleteNotebooksRequest {}

export class GetNotebooksRequest {}

type Sort  = "ASC" | "DESC";
export class listSort{
  @ApiProperty({examples : ["ASC", "DESC"]})
  name: string;

  @ApiProperty({examples : ["ASC", "DESC"]})
  update_at: string;

  @ApiProperty({examples : ["ASC", "DESC"]})
  create_at: string;
}
export class SearchNotebooksRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  sort: listSort;
}

export enum SortNotebooksRequest {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}


