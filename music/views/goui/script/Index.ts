import {client, modules, router} from "@intermesh/groupoffice-core";
import {Main} from "./Main.js";
import {t, translate, EntityID} from "@intermesh/goui";

modules.register(  {
	package: "tutorial",
	name: "music",
	entities: [
		"Genre",
		"Artist",
		"Review"
	],
	async init () {

		client.on("authenticated",  (client, session) => {
			if(!session.capabilities["go:tutorial:music"]) {
				// User has no access to this module
				return;
			}

			translate.load(GO.lang.core.core, "core", "core");
			translate.load(GO.lang.tutorial.music, "tutorial", "music");

			const mainPanel = new Main();

			router.add(/^music\/(\d+)$/, (id: EntityID) => {
				modules.openMainPanel("music");
				mainPanel.setArtistId(id);
			});

			router.add(/^music$/, () => {
				modules.openMainPanel("music");
			});

			modules.addMainPanel( "tutorial", "music", "music", t("Music"), () => {
				return mainPanel;
			});
		});
	}
});