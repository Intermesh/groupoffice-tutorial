import {BaseEntity, DataSourceStore, Table, avatar, column, comp, datasourcestore, t } from "@intermesh/goui";
import { JmapDataSource, img, jmapds } from "@intermesh/groupoffice-core";

interface Artist extends BaseEntity {
	name: string,
	active: boolean,
	photo: string
}

export class ArtistTable extends Table<DataSourceStore> {
	constructor() {
		const store = datasourcestore<JmapDataSource<Artist>, Artist>({
			dataSource: jmapds("Artist"),
			queryParams: {
				limit: 0,
				filter: {
					permissionLevel: 5
				}
			},
			sort: [{property: "name", isAscending: true}]
		});

		const columns = [
			column({
				id: "id",
				hidden: true,
				sortable: true,
			}),
			column({
				header: t("Photo"),
				id: "photo",
				resizable: false,
				width: 80,
				renderer: (v, record) => {
					const c = comp({
						itemId: "avatar-container"
					});
					if (v) {
						c.items.add(img({
							cls: "goui-avatar",
							blobId: v,
							title: record.name
						}))
					}  else {
						c.items.add(avatar({displayName: record.name}));
					}
					return c;
				}
			}),
			column({
				header: t("Name"),
				id: "name",
				resizable: true,
				sortable: true
			}),
			column({
				width: 80,
				resizable: false,
				id: "active",
				header: t("Active"),
				renderer: (v, record) => {
					return comp({cls: "icon", html: v ? "check": "cancel"});
				}
			})
		];

		super(store, columns);
		this.fitParent = true;
		this.rowSelectionConfig = {
			multiSelect: true
		};
	}

}