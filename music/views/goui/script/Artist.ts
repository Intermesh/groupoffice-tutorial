import {BaseEntity, DateTime, EntityID} from "@intermesh/goui";

export interface Artist extends BaseEntity {
	name: string,
	genreId: number,
	photo: string|null,
	createdBy: EntityID,
	modifiedBy: EntityID,
	createdAt: DateTime,
	modifiedAt: DateTime,
	albums: Album[]
}

export interface Album {
	name: string,
	releaseDate: DateTime|string,
	genreId: EntityID,
	artistId: EntityID,
	id: EntityID
	reviews: EntityID[]
}

export interface Review extends BaseEntity {
	albumId: EntityID,
	aclId: EntityID,
	createdBy: EntityID,
	modifiedBy: EntityID,
	rating: 1|2|3|4|5,
	title: string,
	body: string
}