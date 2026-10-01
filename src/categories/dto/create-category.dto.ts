import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  IsUUID,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
