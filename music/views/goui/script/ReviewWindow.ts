import { FormWindow, router } from "@intermesh/groupoffice-core";
import {Album} from "./Artist";
import {fieldset, numberfield, select, t, textarea, textfield } from "@intermesh/goui";

export class ReviewWindow extends FormWindow {

	private readonly data: Album;
	constructor(data: Album) {
		super("Review");
		this.data = data;
		this.title = t("Review") + ": " + data.name;

		this.stateId = "add-review-dialog";
		this.maximizable = true;
		this.resizable = true;
		this.modal = true;
		this.width = 640;

		this.form.on("save", (form, data, isNew) => {
			router.goto("artist/" + this.data.artistId);
		});

		this.generalTab.items.add(
			fieldset({},
				textfield({
					name: "title",
					label: t("Title"),
					required: true
				}),
				numberfield({
					hidden: true,
					value: parseInt(this.data.id),
					required: true,
					name: "albumId"
				}),
				select({
					label: t("Rating"),
					name: "rating",
					required: true,
					options: [
						{
							value: 1,
							name: t("1 star")
						},
						{
							value: 2,
							name: t("2 stars")
						},
						{
							value: 3,
							name: t("3 stars")
						},
						{
							value: 4,
							name: t("4 stars")
						},
						{
							value: 5,
							name: t("5 stars")
						},

					]
				}),
				textarea({
					required: true,
					name: "body",
					label: t("Your review")
				})
			)
		)

		this.addSharePanel();
	}
}