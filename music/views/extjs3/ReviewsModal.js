go.modules.tutorial.music.ReviewsModal = Ext.extend(go.Window, {
	stateId: 'album-reviews',
	title: t("Reviews"),
	width: dp(1000),
	height: dp(800),
	maximizable: true,
	collapsible: false,
	modal: true,
	stateful: true,
	layout: 'fit',
	initComponent: function () {
		this.tools = [{
			id: "add",
			handler: function () {
				var dlg = new go.modules.tutorial.music.ReviewDialog();
				dlg.setValues({albumId: this.albumid});
				dlg.show();
			}
		}];

		this.store = new go.data.Store({
			fields: [
				'id',
				'title',
				'body',
				'rating',
				'albumtitle',
				'createdBy',
				{name: 'creator', type: "relation"},
				'albumId', 'aclId', "permissionLevel"
			],
			entityStore: "Review"
		});

		// Use a Group Office store that is connected with an go.data.EntityStore for automatic updates.
		this.store.on('load', function (store, records, options) {
			this.updateView();
			this.updateTitle();
			this.toggleAddBtn();
		}, this);

		this.store.on('remove', function () {
			this.updateView();
			this.toggleAddBtn();
		}, this);

		this.on('destroy', function () {
			this.store.destroy();
		}, this);

		this.on("expand", function () {
			this.updateView();
		}, this);

		// Add a simple context menu. Make sure that the correct permissions are set
		this.contextMenu = new Ext.menu.Menu({
			items: [{
				iconCls: 'ic-delete',
				text: t("Delete"),
				handler: function () {

					Ext.MessageBox.confirm(t("Confirm delete"), t("Are you sure you want to delete this item?"), function (btn) {
						if (btn !== "yes") {
							return;
						}
						go.Db.store("Review").set({destroy: [this.contextMenu.record.id]});
					}, this);

				},
				scope: this
			}, {
				iconCls: 'ic-edit',
				text: t("Edit"),
				handler: function () {
					var dlg = new go.modules.tutorial.music.ReviewDialog();
					dlg.load(this.contextMenu.record.id).show();
				},
				scope: this
			}]
		});

		var cntrClass = Ext.extend(Ext.Container, {
			initComponent: function () {
				Ext.Container.superclass.initComponent.call(this);
				Ext.applyIf(this, go.panels.ScrollLoader);
				this.initScrollLoader();
			},
			store: this.store,
			scrollUp: true
		});

		this.items = [
			this.commentsContainer = new cntrClass({
				region: 'center',
				autoScroll: true
			})
		];

		go.modules.tutorial.music.ReviewsModal.superclass.initComponent.call(this);
	},

	updateView: function () {
		this.commentsContainer.removeAll();
		this.store.each(function (r) {
			var mineCls = r.get("createdBy") == go.User.id ? 'mine' : '';
			var readMore = new go.detail.ReadMore({
				cls: mineCls
			});
			var creator = r.get("creator");
			if (!creator) {
				creator = {
					displayName: t("Unknown user")
				};
			}
			var avatar = {
				xtype: 'box',
				autoEl: {
					tag: 'span', 'ext:qtip': t('{author} wrote: ')
						.replace('{author}', creator.displayName)
				},
				cls: 'photo ' + mineCls
			};
			if (creator.avatarId) {
				avatar.style = 'background-image: url(' + go.Jmap.thumbUrl(creator.avatarId, {
					w: 40,
					h: 40,
					zc: 1
				}) + ');background-color: transparent;';
			} else {
				avatar.html = go.util.initials(creator.displayName);
				avatar.style = 'background-image: none';
			}
			readMore.setText(this.getReviewText(r));

			this.commentsContainer.add({
				xtype: "container",
				cls: 'go-messages',
				items: [{
					xtype: 'container',
					label: t("Creator"),
					items: [avatar, readMore]
				}]
			});
			// Add a context menu, make permissions dependent on ACL
			readMore.on('render', function (me) {
				me.getEl().on("contextmenu", function (e, target, obj) {
					e.stopEvent();

					if (r.data.permissionLevel >= go.permissionLevels.write) {
						this.contextMenu.record = r;
						this.contextMenu.showAt(e.xy);
					}

				}, this);
			}, this);
		}, this);

		this.doLayout();
		var height = 7; // padding on composer
		this.commentsContainer.items.each(function (item, i) {
			height += item.getOuterSize().height;
		});
	},

	// Update window title by adding the album title
	updateTitle: function () {
		var r = this.store.getAt(0), title = this.title;
		if (typeof (r) !== "undefined") {
			this.setTitle(t("Reviews")+"&nbsp;" + t('for') + "&nbsp;" +
				Ext.util.Format.htmlEncode(r.get('albumtitle')));
		} else {
			this.setTitle(t("Reviews"));
		}
	},

	// Check whether current user had added a review. If they have, hide the add button.
	toggleAddBtn: function () {
		if (this.store.query('createdBy', go.User.id).getCount() > 0) {
			this.tools.add.hide();
		} else {
			var r = this.store.getAt(0);
			if (typeof (r) !== "undefined") {
				this.tools.add.albumid = r.get("albumId");
			}
		}
	},

	// Render the review text in a nice fashion
	getReviewText: function (r) {
		var s = "<h4>" + r.get("title") + " </h4><div style='font-size=12px;'>";
		for (var ii = 1; ii <= 5; ii++) {
			s += "<i class='icon'>star" + (r.get('rating') < ii ? "_border" : "") + "</i>";
		}
		s += "</div><p class='s6'>" + Ext.util.Format.htmlDecode(r.get('body')) + "</p>";
		return s;
	}
});
