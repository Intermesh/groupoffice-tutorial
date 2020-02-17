go.modules.tutorial.music.ArtistDialog = Ext.extend(go.form.Dialog, {
	// Change to true to remember state
	stateful: false,
	stateId: 'music-aritst-dialog',
	title: t('Artist'),

	//The dialog set's entities in an go.data.EntityStore. This store notifies all
	//connected go.data.Store view stores to update.
	entityStore: "Artist",
	autoHeight: true,

	// return an array of form items here.
	initFormItems: function () {
		return [{
			// it's recommended to wrap all fields in field sets for consistent style.
			xtype: 'fieldset',
			title: t("Artist information"),
			items: [
				this.avatarComp = new go.form.ImageField({
					name: 'photo'
				}),

				{
					xtype: 'textfield',
					name: 'name',
					fieldLabel: t("Name"),
					anchor: '100%',
					allowBlank: false
				}]
		},

			{
				xtype: "fieldset",
				title: t("Albums"),

				items: [
					{
						//For relational properties we can use the "go.form.FormGroup" component.
						//It's a sub form for the "albums" array property.

						xtype: "formgroup",
						name: "albums",
						hideLabel: true,
						mapKey: 'id',

						// this will add dp(16) padding between rows.
						pad: true,

						//the itemCfg is used to create a component for each "album" in the array.
						itemCfg: {
							layout: "form",
							defaults: {
								anchor: "100%"
							},
							items: [{
								xtype: "hidden",
								name: "id"
							}, {
								xtype: "textfield",
								fieldLabel: t("Name"),
								name: "name"
							},

								{
									xtype: "datefield",
									fieldLabel: t("Release date"),
									name: "releaseDate"
								},

								{
									xtype: "genrecombo"
								}
							]
						}
					}
				]
			}
		];
	}
});