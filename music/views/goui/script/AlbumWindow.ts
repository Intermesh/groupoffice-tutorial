import {EntityID, Form, Notifier, Window, btn, combobox, comp, datefield, fieldset, form, t, tbar, textfield} from "@intermesh/goui";
import { jmapds } from "@intermesh/groupoffice-core";
import {Album, Artist} from "./Artist";
export class AlbumWindow extends Window {

	private entity: Artist;
	private albumId: EntityID | undefined;
	private readonly form: Form;
	constructor(artist: Artist) {
		super();
		this.entity = artist;
		Object.assign(this, {
				title: t("New album"),
				width: 800,
				height: 500,
				modal: true,
				resizable: false,
				maximizable: false
			}
		);
		this.form = form({
			flex: 1,
			cls: "vbox",
			handler: (albumfrm) => {
				const v = albumfrm.value;
				v.artistId = this.entity.id;
				if(this.albumId) {
					const curr = this.entity.albums.find((a) => a.id === this.albumId);
					Object.assign(curr!, v);
				} else {
					this.entity.albums.push(v as Album);
				}
				jmapds("Artist").update(this.entity.id, {albums: this.entity.albums})
					.then((result) => {console.log(result);this.close();})
					.catch((e) => Notifier.error(e))
			}
			},
			fieldset({
					cls: "flow scroll",
					flex: 1
				},

				comp({cls: "vbox gap"},

					textfield({
						label: t("Title"),
						name: "name",
						required: true,
					}),

					datefield({
						name: "releaseDate",
						required: true,
						label: t("Release date"),
					}),

					combobox({
						name: "genreId",
						label: t("Genre"),
						required: true,
						dataSource: jmapds("Genre"),
					})
				),

			),
			tbar({}, "->", btn({type: "submit", text: t("Save")}))
		);

		this.items.add(this.form);
	}

	public load(record: any) {
		this.title = record.name;
		this.albumId = record.id;
		this.form.value = record;
	}
}