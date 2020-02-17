go.modules.tutorial.music.ReviewDialog = Ext.extend(go.form.Dialog, {
	stateId: 'album-review',
	title: t("Review"),
	entityStore: "Review",
	width: dp(800),
	height: dp(600),
	maximizable: false,
	collapsible: false,
	modal: true,

	initFormItems: function () {

		this.addPanel(new go.permissions.SharePanel());

		var items = [{
			xtype: 'fieldset',
			anchor: "100% 100%",
			items: [{
					xtype: 'textfield',
					name: 'title',
					fieldLabel: t("Title"),
					anchor: '100%',
					allowBlank: false
				},
				{
					xtype: 'radiogroup',
					fieldLabel: t("Rating"),
					name: "rating",
					value: null,
					items: [
						{boxLabel: t("It stinks"), inputValue: 1},
						{boxLabel: t("Meh"), inputValue: 2},
						{boxLabel: t("It's OK"), inputValue: 3},
						{boxLabel: t("It's pretty good"), inputValue: 4},
						{boxLabel: t("A stroke of genius"), inputValue: 5}
					]
				},
				{
					xtype: 'xhtmleditor',
					name: 'body',
					fieldLabel: "",
					hideLabel: true,
					anchor: '0 -90',
					allowBlank: false,
					listeners: {
						scope: this,
						ctrlenter: function() {
							this.submit();
						}
					}
				}]
		}
		];

		return items;
	},

	onLoad : function(entityValues) {
		this.supr().onLoad.call(this, entityValues);
	}
});
