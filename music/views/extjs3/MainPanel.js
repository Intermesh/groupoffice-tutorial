go.modules.tutorial.music.MainPanel = Ext.extend(go.modules.ModulePanel, {

	// Use a responsive layout
	layout: "responsive",

	// change responsive mode on 1000 pixels
	layoutConfig: {
		triggerWidth: 1000
	},

	initComponent: function () {

		this.createArtistGrid();

		// Every entity automatically configures a route. Route to the entity when selecting it in the grid.
		this.artistGrid.on('navigate', function (grid, rowIndex, record) {
			go.Router.goto("artist/" + record.id);
		}, this);

		this.sidePanel = new Ext.Panel({
			layout: 'anchor',
			defaults: {
				anchor: '100%'
			},
			width: dp(300),
			cls: 'go-sidenav',
			region: "west",
			split: true,
			autoScroll: true,
			items: [
				this.createGenreFilter(),
				this.createFilterPanel(),
			]
		});
		// Create artist detail component
		this.artistDetail = new go.modules.tutorial.music.ArtistDetail({
			region: "center",
			tbar: [
				//add a back button for small screens
				{
					// this class will hide the button on large screens
					cls: 'go-narrow',
					iconCls: "ic-arrow-back",
					handler: function () {
						this.westPanel.show();
					},
					scope: this
				}]
		});

		//Wrap the grids into another panel with responsive layout for the 3 column responsive layout to work.
		this.westPanel = new Ext.Panel({
			region: "west",
			layout: "responsive",
			stateId: "go-music-west",
			split: true,
			width: dp(800),
			narrowWidth: dp(500), //this will only work for panels inside another panel with layout=responsive. Not ideal but at the moment the only way I could make it work
			items: [
				this.artistGrid, //first item is shown as default in narrow mode.
				this.sidePanel
			]
		});

		//add the components to the main panel's items.
		this.items = [
			this.westPanel, //first is default in narrow mode
			this.artistDetail
		];

		// Call the parent class' initComponent
		go.modules.tutorial.music.MainPanel.superclass.initComponent.call(this);

		//Attach lister to changes of the filter selection.
		//add buffer because it clears selection first and this would cause it to fire twice
		this.genreFilter.getSelectionModel().on('selectionchange', this.onGenreFilterChange, this, {buffer: 1});

		// Attach listener for running the module
		this.on("afterrender", this.runModule, this);
	},


	createArtistGrid: function() {
		this.artistGrid = new go.modules.tutorial.music.ArtistGrid({
			region: "center",

			tbar: [
				//add a hamburger button for smaller screens
				{
					//this class will hide the button on large screens
					cls: 'go-narrow',
					iconCls: "ic-menu",
					handler: function () {
						this.genreFilter.show();
					},
					scope: this
				},
				'->',
				{
					xtype: 'tbsearch'
				},

				// add button for creating new artists
				this.addButton = new Ext.Button({
					iconCls: 'ic-add',
					tooltip: t('Add'),
					handler: function (btn) {
						var dlg = new go.modules.tutorial.music.ArtistDialog({
							formValues: {
								// you can pass form values like this
							}
						});
						dlg.show();
					},
					scope: this
				}),
				{
					iconCls: 'ic-more-vert',
					tooltip: t("More options"),
					menu: [
						{
							itemId: "delete",
							iconCls: 'ic-delete',
							text: t("Delete"),
							handler: function () {
								this.artistGrid.deleteSelected();
							},
							scope: this
						}
					]
				}
			],

			listeners: {
				rowdblclick: this.onGridDblClick,
				scope: this
			}
		});
		return this.artistGrid;
	},

	// Fired when the Genre filter selection changes
	onGenreFilterChange: function (sm) {

		var selectedRecords = sm.getSelections(),
			ids = selectedRecords.column('id'); //column is a special GO method that get's all the id's from the records in an array.

		this.artistGrid.store.setFilter('genres', {genres: ids});
		this.artistGrid.store.load();
	},

	createGenreFilter: function() {
		this.genreFilter = new go.modules.tutorial.music.GenreFilter({
			region: "west",
			width: dp(300),
			autoHeight: true,

			//render a split bar for resizing
			split: true,

			tbar: [{
				xtype: "tbtitle",
				text: t("Genres")
			},
				'->',

				//add back button for smaller screens
				{
					//this class will hide it on larger screens
					cls: 'go-narrow',
					iconCls: "ic-arrow-forward",
					tooltip: t("Artists"),
					handler: function () {
						this.artistGrid.show();
					},
					scope: this
				}
			]
		});
		return this.genreFilter;
	},

	createFilterPanel: function() {
		return new Ext.Panel({
			autoHeight: true,
			tbar: [
				{
					xtype: 'tbtitle',
					text: t("Filters")
				},
				'->',
				{
					xtype: "button",
					iconCls: "ic-add",
					handler: function() {
						var dlg = new go.filter.FilterDialog({
							entity: "Artist"
						});
						dlg.show();
					},
					scope: this
				}
			],
			items: [
				this.filterGrid = new go.filter.FilterGrid({
					filterStore: this.artistGrid.store,
					entity: "Artist"
				})
			]
		});
	},

	// Fired when the module panel is rendered.
	runModule: function () {
		// when this panel renders, load the genres and artists.
		this.genreFilter.store.load();
		this.artistGrid.store.load();
	},

	// Fires when an artist is double clicked in the grid.
	onGridDblClick: function (grid, rowIndex, e) {

		//check permissions
		var record = grid.getStore().getAt(rowIndex);
		if (record.get('permissionLevel') < GO.permissionLevels.write) {
			return;
		}

		// Show dialog
		var dlg = new go.modules.tutorial.music.ArtistDialog();
		dlg.load(record.id).show();
	}
});