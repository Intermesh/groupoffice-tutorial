import {avatar, btn, comp, Component, h3, h4, t, tbar, Window} from "@intermesh/goui";
import {Album} from "./Artist";
import {img, jmapds} from "@intermesh/groupoffice-core";

export class ReviewsWindow extends Window {

	constructor(data: Album) {
		super();
		this.title = `${t("Reviews")} ${t("for")}: ${data.name}`;

		this.stateId = "reviews-dialog";
		this.maximizable = true;
		this.resizable = true;
		this.modal = true;
		this.width = 640;
		this.height = 768;
		this.cls = "vbox gap";

		const scrollCmp = comp({cls: "scroll", flex: 1});

		jmapds("Review").get(data.reviews).then(async (result) => {
			for (const review of result.list) {
				const user = await jmapds("User").single(review!.createdBy);
				const avatarCnt = comp({
						cls: "go-detail-view-avatar pad",
						itemId: "avatar-container"
					});
				if(user!.avatarId) {
					avatarCnt.items.replace(
						img({
							cls: "goui-avatar",
							blobId: user!.avatarId,
							title: user!.displayName
						})
					);
				} else {
					avatarCnt.items.replace(avatar({cls: "goui-avatar", displayName: user!.displayName}));
				}

				scrollCmp.items.add(comp({cls: "card pad"},
					comp({cls: "hbox",},avatarCnt,
						comp({cls: "vbox"},
							h3(review!.title),
							h4(t("By")+ " " +user!.displayName),
						)),
					this.addRating(review.rating),
					comp({cls: "border-bottom", html: review!.body})
				));
			}
		}).finally(() => {
			this.items.add(scrollCmp, tbar({}, "->", btn({
				icon: "close",
				text: t("Close"),
				handler: () => this.close()
			})))
		});

	}

	private addRating(rating: 1 | 2 | 3 | 4 | 5): Component {
		const cmp = comp({cls: "hbox"});
		for (let r = 1; r <= rating; r++) {
			cmp.items.add(comp({cls: "icon", tagName: "i", text: "star_rate"}))
		}
		return cmp;
	}
}