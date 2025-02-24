import {Component, checkbox, comp, fieldset, t, textarea, textfield} from "@intermesh/goui";
import {FormWindow, router} from "@intermesh/groupoffice-core";

export class ArtistWindow extends FormWindow {
	constructor() {
		super("Artist");

		this.title = t("Artist");

		this.stateId = "artist-dialog";
		this.maximizable = true;
		this.resizable = true;
		this.width = 640;

		this.form.on("save", (form, data, isNew) => {
			if (isNew) {
				void router.goto("artist/" + data.id);
			}
		})

		this.generalTab.items.add(
			fieldset({},
				textfield({
					name: "name",
					label: t("Name"),
					required: true
				}),
				checkbox({
					name: "active",
					label: t("Active"),
					type: "switch"
				}),
				textarea({
					name: "bio",
					label: t("Biography")
				})
			)
		)
		this.addCustomFields();
	}
}