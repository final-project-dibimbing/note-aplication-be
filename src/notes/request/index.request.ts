import { ApiProperty } from '@nestjs/swagger';

export class AddNoteRequest {
  @ApiProperty()
  notebook_id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  tags: number[];
}

export class UpdateNoteRequest {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  tags: number[];
}

type Sort  = "ASC" | "DESC";
export class listSort{
  @ApiProperty({examples : ["ASC", "DESC"]})
  update_at: string;

  @ApiProperty({examples : ["ASC", "DESC"]})
  create_at: string;

  @ApiProperty({examples : ["ASC", "DESC"]})
  title : string
}


const ExampleSearchNote = {
  title : "string",
  tags : ["string", "string"],
  notebook_id : "string",
  create_at : "string",
  update_at : "string",
}
export class SearchNoteRequest {
  @ApiProperty()
  title: string;

  @ApiProperty()
  tags: number[];

  @ApiProperty()
  notebook_id: string;

  @ApiProperty()
  create_at: string;

  @ApiProperty()
  update_at: string;

  @ApiProperty()
  sort: listSort;
}

export class DeleteNoteRequest {}

export class GetNoteRequest {}
