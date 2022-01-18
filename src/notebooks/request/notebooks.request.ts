import { ApiProperty, getSchemaPath,  } from '@nestjs/swagger';

export class AddNotebooksRequest {
  @ApiProperty()
  name: string;
}

export class UpdateNotebooksRequest {
  @ApiProperty()
  id: number;

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


