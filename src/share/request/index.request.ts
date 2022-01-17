import { ApiProperty } from "@nestjs/swagger";

export class AddShareRequest{
  @ApiProperty()
  notebook_id : number

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}

export class UpdateShareRequest{
    @ApiProperty()
    id : number
  
    @ApiProperty()
    title: string;
  
    @ApiProperty()
    content: string;
}

export class DeleteShareRequest{

}

export class GetShareRequest{
    
}

