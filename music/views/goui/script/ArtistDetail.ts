import {
	Component,
	DataSourceForm,
	avatar,
	btn,
	column,
	comp,
	datasourceform,
	datecolumn,
	fieldset,
	store,
	t,
	table,
	Table,
	tbar,
	menu,
	displayfield,
	DateTime, h4
} from "@intermesh/goui";
import {client, DetailPanel, img, jmapds, router} from "@intermesh/groupoffice-core";
import {ArtistWindow} from "./ArtistWindow.js";
import {AlbumWindow} from "./AlbumWindow.js";
import {Album, Artist, Review} from "./Artist.js";
import {ReviewsWindow} from "./ReviewsWindow";
import {ReviewWindow} from "./ReviewWindow";

export class ArtistDetail extends DetailPanel<Artist> {
	private form: DataSourceForm<Artist>;
	private avatarContainer: Component;
	private albumsTable: Table;

	constructor() {
		super("Artist");
		this.width = 500;
		this.itemId = "detail";
		this.stateId = "music-detail";

		this.scroller.items.add(
			this.form = datasourceform({
					dataSource: jmapds("Artist")
				},

				comp({cls: "card"},
					tbar({},
						this.titleCmp = comp({tagName: "h3", flex: 1}),
					),
					comp({cls: "hbox", flex: 1},
						this.avatarContainer = comp({
							cls: "go-detail-view-avatar pad",
							itemId: "avatar-container"
						}),
					),
					comp({cls: "pad flow"},
						fieldset({},
							comp({cls: "vbox", flex: 1},
								displayfield({
									icon: "person_alert",
									name: "active",
									label: t("Active"),
									renderer: (v) => {
										return v ? t("Yes") : t("No");
									}
								}),
								displayfield({
									icon: "book",
									name: "bio",
									label: t("Biography"),
								})
							),
						),
					),
				),
			),

			comp({cls:"card"},
				fieldset({},
					tbar({}, h4(t("Albums")), "->", btn({
						icon: "add", cls: "primary", text: t("Add"), handler: () => {
							const w = new AlbumWindow(this.entity!);
							w.on("close", async () => {
								this.load(this.entity!.id)
							});
							w.show();
						}
					})),
					this.albumsTable = table({
						fitParent: true,
						// headers: false,
						store: store({
							data: []
						}),
						columns: [
							column({
								id: "id",
								hidden: true,
							}),
							column({
								id: "name",
								header: t("Title"),
								resizable: true,
								sortable: false
							}),
							datecolumn({
								id: "releaseDate",
								header: t("Release date"),
								sortable: false
							}),
							column({
								resizable: true,
								id: "genreId",
								header: t("Genre"),
								renderer: async (v) => {
									const g = await jmapds("Genre").single(v);
									return g!.name;
								}
							}),
							column({
								resizable: false,
								sticky: true,
								width: 32,
								id: "btn",
								renderer: async (columnValue: any, record, td, table, rowIndex) => {
									const user = client.user;
									let hasReviewed = false, reviewId = undefined;
									for(const currId of record.reviews) {
										const curr = await jmapds("Review").single(currId);
										if (curr!.createdBy == user!.id) {
											hasReviewed = true;
											reviewId = curr!.id;
											break;
										}
									}
									return btn({
										icon: "more_vert", menu: menu({}, btn({
												icon: "edit", text: t("Edit"), handler: async (_btn) => {
													const dlg = new AlbumWindow(this.entity!);
													const album = table.store.get(rowIndex)!;
													dlg.load(album);
													dlg.show();
												}
											}),
											btn({
												icon: "delete", text: t("Delete"), handler: async (btn) => {
													const a = this.entity!.albums.filter(album => album.id !== record.id);
													jmapds("Artist").update(this.entity!.id, {albums: a});
												}
											}),
											btn({
												icon: "reviews",
												text: t("Show reviews"),
												hidden: !record.reviews.length,
												handler: (btn) => {
													const w = new ReviewsWindow(record);
													w.show();
												}
											}),
											btn({
												icon: "rate_review",
												text: hasReviewed ? t("Update review") : t("Write review"),
												handler: (_btn) => {
													const w = new ReviewWindow(record);
													if (hasReviewed) {
														w.load(reviewId!);
													}
													w.show();
												}
											}),
										)
									})
								}
							})
						]
					})
				)
			)
		);

		this.addCustomFields();
		// this.addComments();
		// this.addFiles();
		// this.addLinks();
		// this.addHistory();

		this.toolbar.items.add(
			btn({
				icon: "edit",
				title: t("Edit"),
				handler: (button, ev) => {
					const dlg = new ArtistWindow();
					void dlg.load(this.entity!.id);
					dlg.show();
				}
			}),
			btn({
				icon: "delete",
				title: t("Delete"),
				handler: () => {
					jmapds("Artist").destroy(this.entity!.id).then(() => {
						router.goto("music");
					})
				}
			})
		)
		this.on("load", (pnl, entity) => {
			this.title = entity.name;
			void this.form.load(entity.id);
			if (entity!.photo) {
				pnl.avatarContainer.items.replace(img({
					cls: "goui-avatar-detail",
					blobId: entity.photo,
					title: entity.name
				}));
			} else {
				pnl.avatarContainer.items.replace(avatar({cls: "goui-avatar", displayName: entity.name}));
			}
			entity.albums.sort((a: Album, b: Album) => {
				const ra: string = <string>a.releaseDate, rb: string = <string>b.releaseDate;

				return DateTime.createFromFormat(ra, "Y-m-d")!.compare(DateTime.createFromFormat(rb, "Y-m-d")!);
			});
			this.albumsTable.store.loadData(entity.albums, false);
		});
	}
}