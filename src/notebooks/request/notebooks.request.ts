import { ApiProperty } from "@nestjs/swagger";

export class AddNotebooksRequest{
  @ApiProperty()
  name : string
}

export class UpdateNotebooksRequest{
    @ApiProperty()
    id : number
  
    @ApiProperty()
    name: string;
}

export class DeleteNotebooksRequest{

}

export class GetNotebooksRequest{
    
}

