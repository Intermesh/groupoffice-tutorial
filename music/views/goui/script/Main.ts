import {
	btn,
	comp,
	Component,
	EntityID,
	mstbar,
	Notifier,
	paginator,
	searchbtn,
	t,
	tbar
} from "@intermesh/goui";
import {
	authManager,
	router,
	MainThreeColumnPanel,
} from "@intermesh/groupoffice-core";
import {ArtistTable} from "./ArtistTable.js";
import {GenreTable} from "./GenreTable.js";
import { ArtistDetail } from "./ArtistDetail.js";
import {ArtistWindow} from "./ArtistWindow.js";

export class Main extends MainThreeColumnPanel {
	protected east!: ArtistDetail;
	private artistTable!: ArtistTable;

	private genreTable!: GenreTable;

	constructor() {
		super("music");

		this.on("render", async () => {
			try {
				await authManager.requireLogin();
			} catch (e) {
				console.warn(e);
				Notifier.error(t("Login is required on this page"));
			}

			await this.genreTable.store.load();
			await this.artistTable!.store.load();
		});
	}

	protected createWest(): Component {
		this.genreTable = new GenreTable();
		this.genreTable.rowSelectionConfig = {
			multiSelect: true,
			listeners: {
				selectionchange: (tableRowSelect) => {
					const genreIds = tableRowSelect.selected.map((index: number) => tableRowSelect.list.store.get(index)!.id);
					this.artistTable.store.queryParams.filter!.genres = genreIds;
					this.artistTable.store.load();
				}
			}
		}

		return comp({
				cls: "vbox scroll",
				width: 300
			},
			tbar({
					cls: "border-bottom"
				},
				comp({
					tagName: "h3",
					text: t("Genre"),
					flex: 1
				}),
				'->',
				btn({
					cls: "for-small-device",
					title: t("Close"),
					icon: "close",
					handler: (button, ev) => {
						this.activatePanel(this.center);
					}
				})
			),
			this.genreTable
		);
	}

	protected createEast(): ArtistDetail {
		const detail = new ArtistDetail();
		detail.itemId = "artistDetail";
		detail.stateId = "artist-detail";
		detail.toolbar.items.insert(0,this.showCenterButton());
		return detail;
	}

	protected createCenter(): Component {
		this.artistTable = new ArtistTable();
		this.artistTable.on("navigate", async (table: ArtistTable, rowIndex: number) => {
			await router.goto("music/" + table.store.get(rowIndex)!.id);
		});

		return comp({
				cls: 'active vbox',
				itemId: 'table-container',
				flex: 1
			},

			tbar({},
				btn({
					cls: "for-small-device",
					title: t("Menu"),
					icon: "menu",
					handler: (button, ev) => {
						this.activatePanel(this.west);
					}
				}),

				'->',

				searchbtn({
					listeners: {
						input: (sender, text) => {
							this.artistTable.store.queryParams.filter!.text = text;
							this.artistTable.store.load();
						}
					}
				}),

				mstbar({table: this.artistTable}),

				btn({
					itemId: "add",
					icon: "add",
					cls: "filled primary",
					handler: async () => {
						const w = new ArtistWindow();
						w.on("close", async () => {});
						w.show();

					}
				})
			),

			comp({
					flex: 1,
					stateId: "music",
					cls: "scroll border-top main"
				},
				this.artistTable
			),


			paginator({
				store: this.artistTable.store
			})
		);
	}

	async setArtistId(id: EntityID) {
		void this.east.load(id);
		this.activatePanel(this.east);
	}

}
