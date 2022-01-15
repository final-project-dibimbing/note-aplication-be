import { ApiProperty } from "@nestjs/swagger";

export class AddRequest{
  @ApiProperty()
  notebook_id : number

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

export class UpdateRequest{
    @ApiProperty()
    id : number
  
    @ApiProperty()
    title: string;
  
    @ApiProperty()
    content: string;
}

export class DeleteRequest{

}

export class getRequest{
    
}

