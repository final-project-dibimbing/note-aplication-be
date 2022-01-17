import { ApiProperty } from "@nestjs/swagger";

export class AddTagRequest{
  @ApiProperty()
  title : string
}

export class UpdateTagRequest{
    @ApiProperty()
    id : number
  
    @ApiProperty()
    title: string;
}

export class DeleteTagRequest{

}

export class GetTagRequest{
    
}

