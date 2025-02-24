import {BaseEntity, DataSourceStore, Table, checkboxselectcolumn, column, datasourcestore, t} from "@intermesh/goui";
import {JmapDataSource, jmapds} from "@intermesh/groupoffice-core";

interface Genre extends BaseEntity {
	name: string,
}

export class GenreTable extends Table<DataSourceStore> {
	constructor() {
		const store = datasourcestore<JmapDataSource<Genre>, Genre>({
			dataSource: jmapds("Genre"),
			queryParams: {
				limit: 0,
				filter: {
					permissionLevel: 5
				}
			},
			sort: [{property: "name", isAscending: true}]
		});

		const columns = [
			checkboxselectcolumn(),
			column({
				header: t("Name"),
				id: "name",
				resizable: true,
				width: 312,
				sortable: true
			})
		];

		super(store, columns);
		this.fitParent = true;

		this.rowSelectionConfig = {
			multiSelect: true
		};
	}
}