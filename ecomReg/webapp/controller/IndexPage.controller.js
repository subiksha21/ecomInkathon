sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library",
	'sap/m/MessageToast',
	'sap/m/MessageStrip', 'sap/m/MessageBox', "sap/ui/core/UIComponent"
], function (Device, Controller, JSONModel, Popover, Button, library, MessageToast, MessageStrip, MessageBox, UIComponent) {
	"use strict";
	var ButtonType = library.ButtonType,
		PlacementType = library.PlacementType;
	var CarouselArrowsPlacement = library.CarouselArrowsPlacement,
		PlacementType = library.PlacementType;

	return Controller.extend("ink.trng.proj.ecomReg.controller.IndexPage", {
		onInit: function () {
			this.bLoggedIn = false;
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oCrslModel = new JSONModel("model/crslImages.json");
			var iPagesCount = 2;
			this.getView().setModel(oCrslModel, "crslImages");

			//this._setToggleButtonTooltip(!Device.system.desktop);
			//this.byId("pageContainer").to(this.getView().createId("root1"));

			this._setNumberOfImagesInCarousel(5);
			var oImageModel = new JSONModel("model/img.json");
			this.getView().setModel(oImageModel, "ImgModel");
			var oMenuModel = new JSONModel("model/menuItems.json");
			this.getView().setModel(oMenuModel, "menu");
			var oDateModel = new sap.ui.model.json.JSONModel({
				minDate: new Date(1920, 1, 1),
				maxDate: new Date(2009, 12, 1)
			});
			this.getView().setModel(oDateModel, "date");
			if (!sap.ui.Device.system.phone) {

				this.getView().byId("idTitle").removeStyleClass("customImgWidthPhone");
				//this.getView().byId("iduserAcc").setVisible(true);
				iPagesCount = 4;
				this.getView().byId("homeHbox1").addStyleClass("customHbox");
				this.getView().byId("homeHbox2").addStyleClass("customHbox");
				this.getView().byId("homeHbox3").addStyleClass("customHbox");
				this.getView().byId("idHomecrsl1").addStyleClass("customCrsl");
				this.getView().byId("idHomecrsl2").addStyleClass("customCrsl");
			} else {
				/*var oImageModel = new JSONModel("model/imgMobile.json");
				this.getView().setModel(oImageModel, "ImgModel");*/
				this.getView().byId("idTitle").removeStyleClass("titleImage");
				this.getView().byId("idTitle").addStyleClass("customImgWidthPhone");
				//this.getView().byId("iduserAcc").setVisible(false);

			}
			var oSettings = new JSONModel("model/data.json");
			this.getView().setModel(oSettings, "settings");
			oSettings.setProperty("/pagesCount", iPagesCount);
			var oSelectedRow = {
				"payload": {
					"firstname": "firstname",
					"lastname": "lastname",
					"contact": "9876543210",
					"email": "abc@xyz.com",
					"gender": "M",
					"password": "abcdef",
					"dob": "2020-03-01"
				}
			};
			var oModel = new JSONModel(oSelectedRow);
			this.getView().setModel(oModel, "oViewModel");
			this.newEmailforverify = "";
			this.contactforverify = "";
			this.newpass = "";
			this.pass = "";
			this.f1 = false;
			this.f2 = false;
			this.f3 = false;
			this.f4 = false;
			this.f5 = false;
			this.f6 = false;
			this.f7 = false;
			this.f8 = false;
			this.f9 = false;
			this.timer = "";
			var visibledata = {
				"lengthcheck": false,
				"Numeric": false,
				"Uppercase": false,
				"Strongpassword": false,
				"successPassword": false,
				"Lowercase": false,
				"ShowPassword": false,
				"FirstName": false,
				"LastName": false,
				"MaxLength1": false,
				"EmailPattern": false,
				"confirmPasswordpattern": false,
				"showpass": false,
				"showpassbtn": true,
				"hidepassbtn": false,
				"addpass": true,
				"showpass1": false,
				"showpassbtn1": true,
				"hidepassbtn1": false,
				"addpass1": true,
				"showpass3": false,
				"showpassbtn3": true,
				"hidepassbtn3": false,
				"addpass3": true,
				"EmailPatternverify": false,
				"EmailPatternsubmit": false,
				"timeup": false,
				"Contactnopattern": false,
				"ContactPatternsubmit": false,
				"Forgotpasswordemail": false,
				"LoginPage": true,
				"RegisterPage": false,
				"AfterSubmit": false

			};
			var oModel1 = new JSONModel(visibledata);
			this.getView().setModel(oModel1, "oVisibilityModel");
			this.fpc = false; //forgotPassword1
			this.loginEmail = "";
			this.loginpassword = "";
			this.newEmail = "";
			this.newid = 0;
			this.newotp = "";
		},
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		}/*,
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		}*/,
		handleUserNamePress: function (event) {
			var that = this;
			//	this.byId("pageContainer").to(this.getView().createId("loginPage"));
			if (this.bLoggedIn) {
				var oPopover = new Popover({
					showHeader: false,
					placement: PlacementType.Bottom,
					content: [
						new Button({
							text: 'My Profile',
							type: ButtonType.Transparent,
							press: function () {
								//console.log("You clicked on Button ");
								that.byId("pageContainer").to(that.getView().createId("page1"));
							}
						}),
						new Button({
							text: 'My Cart',
							type: ButtonType.Transparent
						}),
						new Button({
							text: 'My Orders',
							type: ButtonType.Transparent
						}),
						new Button({
							text: 'Contact Us',
							type: ButtonType.Transparent
						}),
						new Button({
							text: 'Logout',
							type: ButtonType.Transparent
						})

					]
				}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

				oPopover.openBy(event.getSource());
			} else {
				var oPopover = new Popover({
					showHeader: false,
					placement: PlacementType.Bottom,
					content: [
						new Button({
							text: 'Login',
							type: ButtonType.Transparent,
							press: function (oEvent) {
								
								that.byId("pageContainer").to(that.getView().createId("loginPage"));
								
							}
						})
					]
				}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

				oPopover.openBy(event.getSource());
			}
		},
		_setNumberOfImagesInCarousel: function (numberOfImages) {
			if (!numberOfImages || numberOfImages < 1 || numberOfImages > 9) {
				return;
			}

			var oCarousel = this.byId("carouselSample");
			oCarousel.destroyPages();
			oCarousel.setPageIndicatorPlacement(PlacementType.Bottom);

			for (var i = 0; i < numberOfImages; i++) {
				var imgId = "img" + (i + 1);
				var imgSrc = "{ImgModel>/images/" + i + "}";
				var imgAlt = "Banner" + (i + 1);
				var img = new sap.m.Image(imgId, {
					src: imgSrc,
					alt: imgAlt,
					width: "100%",
					height: "100%",
					densityAware: false,
					decorative: false
				});

				oCarousel.addPage(img);
			}
		},
		onHomeIconPress: function () {
			this.byId("pageContainer").to(this.getView().createId("root1"));
			this.getView().getModel("oVisibilityModel").setProperty("/LoginPage", true);
			this.getView().getModel("oVisibilityModel").setProperty("/RegisterPage", false);
		},
		OnpressLogin: function (oEvent) {

			this.loginflag = false;
			this.getView().getModel("oLoginModel").setProperty("Email", this.loginEmail);
			this.getView().getModel("oLoginModel").setProperty("Password", this.loginpassword);
			var len = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata").length;
			//console.log(len);
			for (var i = 0; i < len; i++) {

				if ((this.loginEmail == this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/Email")) && (this
						.loginpassword ==
						this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/Password"))) {
					this.loginflag = true;
					break;
				} else {
					this.loginflag = false;
				}
			}
			if (this.loginflag == true) {
				MessageToast.show("login successful");

			} else {
				MessageToast.show("login not successful");
			}

		},
		eMailLogin: function (oEvent) {
			this.loginEmail = oEvent.getParameters().value;

			if (this.loginEmail.length > 0) {
				var noSpaces2 = this.loginEmail.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", false);
					//	MessageToast.show("valid email");
					var newlen = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata").length;
					for (var i = 0; i < newlen; i++) {
						if (this.loginEmail == this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/Email")) {
							this.newid = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/ID");
							//console.log(this.newid);
						}
					}
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", true);
				}
			}
		},
		passWordLogin: function (oEvent) {
			this.loginpassword = oEvent.getParameters().value;

		},
		onPasswordChangeSubmit: function () {
			if ((this.newEmail).length <= 0) {
				this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", true);
			} else {
				this.getView().getModel("oRegisterModel").setProperty("/oregisterdata/userdata/NewEmail", this.newEmail);
				var len1 = this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata").length;
				for (var i = 0; i < len1; i++) {
					if (this.newid == this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/ID")) {
						//console.log(this.newid);
						//console.log(this.getView().getModel("oRegisterModel").getProperty("/userdata/" + i + "/ID"));
						this.getView().getModel("oRegisterModel").setProperty("/oregisterdata/userdata/" + i + "/NewEmail", this.newEmail);
						//	console.log(this.getView().getModel("oRegisterModel").getProperty("/oregisterdata/userdata/" + i + "/NewEmail"));
					}
				}
				this.dialog1.close();
				if (!this.dialog2) {
					this.dialog2 = sap.ui.xmlfragment("idItemFrag2", "ink.trng.proj.ecomReg.fragment.forgotpassword2", this);
					this.getView().addDependent(this.dialog2);
				}
				var EmptyJsonModel = this.getOwnerComponent().getModel("oRegisterModel");
				EmptyJsonModel.setProperty("/NewEmail", this.newEmail);

				var time = this.getView().byId("timer");
				var fiveMinutesLater = new Date();
				var scs = fiveMinutesLater.setMinutes(fiveMinutesLater.getMinutes() + 1);
				var countdowntime = scs;
				var x = setInterval(function () {
					var that = this;
					var now = new Date().getTime();
					var cTime = countdowntime - now;
					var minutes = Math.floor((cTime % (1000 * 60 * 60)) / (1000 * 60));
					var second = Math.floor((cTime % (1000 * 60)) / 1000);
					var timer = "OTP Expires in" + minutes + ":" + second + "Seconds";
					EmptyJsonModel.setProperty("/text", timer);
					if (cTime < 0) {
						var timer = "OTP Expires in" + "0:0" + "Minutes";
						EmptyJsonModel.setProperty("/text", timer);
					}
				});
				this.dialog2.open();
			}

		},
		onPasswordChangeCancel: function () {
			this.dialog1.close();
			this.dialog1.destroy();
			this.dialog1 = null;
		},
		OnPressingForgotPassword: function () {
			if (!this.dialog1) {
				this.dialog1 = sap.ui.xmlfragment("idItemFrag1", "ink.trng.proj.ecomReg.fragment.forgotpassword1", this);
				this.getView().addDependent(this.dialog1);
			}
			this.dialog1.open();
		},
		fpasswordmail: function (oEvent) {
			this.newEmail = oEvent.getParameters().value;
			if (this.newEmail.length > 0) {
				var noSpaces2 = this.newEmail.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", false);

				} else {

					this.getView().getModel("oVisibilityModel").setProperty("/Forgotpasswordemail", true);
				}
			}

		},
		onSubmitforgotpassword2: function () {
			this.dialog2.close();
			if (!this.dialog3) {
				this.dialog3 = sap.ui.xmlfragment("idItemFrag1", "ink.trng.proj.ecomReg.fragment.forgotpassword3", this);
				this.getView().addDependent(this.dialog3);
			}
			this.dialog3.open();
		},
		NewPassword: function (oEvent) {
			this.newpass = oEvent.getParameters().value;
			var passlen = this.newpass.length;
			this.isNumberFieldValid(this.newpass, passlen);

		},
		isNumberFieldValid: function (testNumber, inputlen) {

			if (inputlen == 0 || inputlen < 6 || inputlen > 12) {
				this.getView().getModel("oVisibilityModel").setProperty("/lengthcheck", true);
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/lengthcheck", false);

			}
			var noSpaces = testNumber.replace(/ +/, ""); //Remove leading spaces

			var isNum = /.*[0-9a-zA-Z,~,!,@,#,$,%,^,&,*].*/.test(noSpaces);

			var isnumber = /.*[0-9].*/.test(noSpaces);
			var isUpperChar = /.*[A-Z].*/.test(noSpaces);
			var isLowerChar = /.*[a-z].*/.test(noSpaces);
			var isSpecialChar = /.*[~,!,@,#,$,%,^,&,*].*/.test(noSpaces);
			if (isNum) {
				if (isnumber) {
					this.getView().getModel("oVisibilityModel").setProperty("/Numeric", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Numeric", true);
				}
				if (isUpperChar) {
					this.getView().getModel("oVisibilityModel").setProperty("/Uppercase", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Uppercase", true);
				}
				if (isLowerChar) {

					this.getView().getModel("oVisibilityModel").setProperty("/Lowercase", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Lowercase", true);
				}
				if (isSpecialChar) {
					this.getView().getModel("oVisibilityModel").setProperty("/Strongpassword", false);

				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/Strongpassword", true);
				}

			}

		},
		NewConfirmPassword: function (oEvent) {
			var conpass = oEvent.getParameters().value;

			if (conpass.length > 0) {
				if (this.newpass != conpass) {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", true);
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", false);
					this.getView().getModel("oLoginModel").setProperty("/Confirmpassword", conpass);

				}
			}
		},
		onPressingsubmitfp3: function () {
			this.dialog3.close();
		},
		OnPressingRegisterhereButton: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/LoginPage", false);
			this.getView().getModel("oVisibilityModel").setProperty("/RegisterPage", true);
		},
		//RegisterPage functions

		firstName: function (oEvent) {
			var firstname = oEvent.getParameters().value;
			if (firstname.length > 0) {
				var noSpaces = firstname.replace(/ +/, "");
				var isAllChar = /^[A-Za-z]+$/.test(noSpaces);
				if (isAllChar) {
					this.getView().getModel("oVisibilityModel").setProperty("/FirstName", false);
					this.getView().getModel("oViewModel").setProperty("/payload/firstname", firstname);
					this.f1 = true;
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/FirstName", true);
				}
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/FirstName", true);
			}
		},
		lastName: function (oEvent) {
			var lastname = oEvent.getParameters().value;
			if (lastname.length > 0) {
				var noSpaces1 = lastname.replace(/ +/, "");
				var isAllChar1 = /^[A-Za-z]+$/.test(noSpaces1);
				if (isAllChar1) {
					this.getView().getModel("oVisibilityModel").setProperty("/LastName", false);
					this.getView().getModel("oViewModel").setProperty("/payload/lastname", lastname);
					this.f2 = true;
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/LastName", true);
				}
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/LastName", true);
			}

		},
		contactNumber: function (oEvent) {
			var contactnum = oEvent.getParameters().value;
			var bIsPhone = /^[789]\d{9}$/.test(contactnum);

			if (bIsPhone && contactnum.length > 0 && contactnum.length <= 10) {

				this.getView().getModel("oVisibilityModel").setProperty("/MaxLength1", false);
				this.getView().getModel("oViewModel").setProperty("/payload/contact", contactnum);
				this.f3 = true;

			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/MaxLength1", true);
			}

		},
		eMail: function (oEvent) {
			var email = oEvent.getParameters().value;
			if (email.length > 0) {
				var noSpaces2 = email.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/EmailPattern", false);
					this.getView().getModel("oViewModel").setProperty("/payload/email", email);
					this.f4 = true;
				} else {

					this.getView().getModel("oVisibilityModel").setProperty("/EmailPattern", true);
				}
			}
		},
		passWord: function (oEvent) {
			this.pass = oEvent.getParameters().value;
			var passlen = this.pass.length;
			this.isNumberFieldValid(this.pass, passlen);
			this.getView().getModel("oViewModel").setProperty("/payload/password", this.pass);
		},
		confirmPassword: function (oEvent) {
			var conpass = oEvent.getParameters().value;

			if (conpass.length > 0) {
				if (this.pass != conpass) {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", true);
				} else {
					this.getView().getModel("oVisibilityModel").setProperty("/confirmPasswordpattern", false);
					this.getView().getModel("oViewModel").setProperty("/Confirmpassword", conpass);
					this.f5 = true;
				}
			}
		},
		_fnfetchtoken: function () {
			var token = {
				"csrfToken": ""
			};
			var oToken = new sap.ui.model.json.JSONModel(token);
			sap.ui.getCore().setModel(oToken, "oToken");
			var tokenModel = sap.ui.getCore().getModel("oToken").getData();
			var sGetUrl = "/register_CF/service/fetchdata";
			$.ajax({
				url: sGetUrl,
				data: null,
				async: false,
				headers: {
					ContentType: "application/json",
					Accept: "application/json",
					cache: false,
					"X-CSRF-Token": "Fetch"
				},
				success: function (data, status, response) {
					//MessageToast.show("Success");
					console.log("Success" + data);
					tokenModel["csrfToken"] = response.getResponseHeader("X-Csrf-Token");
					console.log(tokenModel);
				},
				error: function (error) {
					console.log("error" + error);
					//MessageToast.show("Error");
				},
				type: "GET"
			});

		},
		Onpresssubmit: function () {
			this._fnfetchtoken();

			var that = this;

			var dob = this.getView().byId("date").getValue();
			var oTableModel = this.getView().getModel("oViewModel");
			if (dob.length > 0) {

				oTableModel.setProperty("/payload/dob", dob);
				this.f6 = true;
			}
			var lv_data = this.getView().getModel("oViewModel").getProperty("/payload");
			var jsonData = JSON.stringify(lv_data);

			if (this.f1 == true && this.f2 == true && this.f3 == true && this.f4 == true && this.f5 == true && this.f6 == true && this.f7 ==
				true && this.f8 == true) {
				var tokenModel = sap.ui.getCore().getModel("oToken").getData();
				var sToken = tokenModel["csrfToken"];
				console.log(sToken);
				var sUrl = "/register_CF/service/register";
				$.ajax({
					url: sUrl,
					data: jsonData,
					async: true,
					headers: {
						"X-CSRF-Token": sToken
					},
					dataType: "json",
					cache: false,
					contentType: "application/json;charset=UTF-8",
					success: function (data) {
						that._fnfetchtoken();
						MessageToast.show("Successfully Registered");
						console.log(data);
					},
					error: function (error) {
						console.log(error);
						MessageToast.show("Uh oh...Try Again");
					},
					type: "POST"
				});
			} else {
				MessageToast.show("Validation Failed!!");
			}
		},
		_getDialog: function () {
			if (!this.dialog) {
				this.dialog = sap.ui.xmlfragment("idItemFrag1", "ink.trng.proj.ecomReg.fragment.otp1", this);
				this.getView().addDependent(this.dialog);
				var EmptyJsonModel = this.getOwnerComponent().getModel("oRegisterModel");

				var fiveMinutesLater = new Date();
				var scs = fiveMinutesLater.setMinutes(fiveMinutesLater.getMinutes() + 1);
				var countdowntime = scs;
				var x = setInterval(function () {
					var that = this;
					var now = new Date().getTime();
					var cTime = countdowntime - now;
					var minutes = Math.floor((cTime % (1000 * 60 * 60)) / (1000 * 60));
					var second = Math.floor((cTime % (1000 * 60)) / 1000);
					this.timer = "OTP Expires in " + minutes + ":" + second + " Seconds";
					//console.log(typeof (minutes));
					EmptyJsonModel.setProperty("/text1", this.timer);
					if (cTime < 0) {

						this.timer = "Your OTP got expired!! Please Select Reset Button to get New OTP!!";
						var newtimer = "OTP Expires in" + "0:0" + "Seconds";
						EmptyJsonModel.setProperty("/text1", this.timer);

					}
				});
				this.dialog.open();
			}

		},

		onSubmit: function () {
			this.dialog.close();
			this.dialog.destroy();
			this.dialog = null;
			this.getView().getModel("oVisibilityModel").setProperty("/LoginPage", true);
			this.getView().getModel("oVisibilityModel").setProperty("/RegisterPage", false);

		},
		showPassword: function () {
			this.getView().byId("showpasswordid").setValue(this.pass);
			this.getView().getModel("oVisibilityModel").setProperty("/showpass", true);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn", false);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn", true);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass", false);
			this.isNumberFieldValid(this.pass, this.pass.length);
		},
		hidePassword: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/showpass", false);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn", true);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn", false);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass", true);

		},

		handleLinkPress: function (evt) {
			MessageBox.alert("Terms and Conditions");
		},

		onSelectGender: function (oEvent) {
			var selectedG = oEvent.getSource().getSelectedIndex();
			var male = "M";
			var female = "F";
			var others = "O";
			if (selectedG == 0) {

				this.getView().getModel("oViewModel").setProperty("/payload/gender", male);
				this.f7 = true;

			} else if (selectedG == 1) {

				this.getView().getModel("oViewModel").setProperty("/payload/gender", female);
				this.f7 = true;

			} else if (selectedG == 2) {

				this.getView().getModel("oViewModel").setProperty("/payload/gender", others);
				this.f7 = true;

			}
		},
		Isselected: function (oEvent) {
			var check = oEvent.getSource();
			if (check.bOutput == true) {
				this.f8 = true;
			} else {
				this.f8 = false;
			}
		},
		verifyEmail: function (oEvent) {
			this.newEmailforverify = oEvent.getParameters().value;
			if (this.newEmailforverify.length > 0) {
				var noSpaces2 = this.newEmailforverify.replace(/ +/, "");
				var isemail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.]+[a-zA-Z]{2,4}$/.test(noSpaces2);
				if (isemail) {
					this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternverify", false);
					this.getView().getModel("oViewModel").setProperty("/NewEmailRegistration", this.newEmailforverify);
					this.f9 = false;

				} else {
					this.f9 = true;
					this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternverify", true);
				}
			}

		},
		onpressemailverify: function () {
			if ((this.newEmailforverify).length <= 0) {
				this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternsubmit", true);
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/EmailPatternsubmit", false);
				this.dialognew.close();
				this._getDialog();
			}

		},
		onpressemailverifyCancel: function () {

			this.dialognew.close();
			this.dialognew.destroy();
			this.dialognew = null;
		},
		onpressingotpemailcancel: function () {
			this.dialog.close();
		},
		onResendOTPEmail: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/timeup", true);

		},
		verifyContactNumber: function (oEvent) {
			this.contactforverify = oEvent.getParameters().value;
			if (this.contactforverify.length > 0 && this.contactforverify.length <= 10) {

				this.getView().getModel("oVisibilityModel").setProperty("/Contactnopattern", false);
				this.getView().getModel("oViewModel").setProperty("/Contactno", this.contactforverify);
				this.f3 = true;

			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/Contactnopattern", true);
			}
		},
		onpresscontactnoverifyCancel: function () {
			this.dialogphone.close();
			this.dialogphone.destroy();
			this.dialogphone = null;

		},
		onpresscontactnoverify: function () {
			if ((this.contactforverify).length <= 0) {
				this.getView().getModel("oVisibilityModel").setProperty("/ContactPatternsubmit", true);
			} else {
				this.getView().getModel("oVisibilityModel").setProperty("/ContactPatternsubmit", false);
				this.dialogphone.close();
				this._getDialog();
			}
		},
		EmailVerification: function () {
			if (!this.dialognew) {
				this.dialognew = sap.ui.xmlfragment("idItemFrag7", "ink.trng.proj.ecomReg.fragment.Emailverification", this);
				this.getView().addDependent(this.dialognew);
			}
			this.dialognew.open();
		},
		PhoneNoVerification: function () {
			if (!this.dialogphone) {
				this.dialogphone = sap.ui.xmlfragment("idItemFrag5", "ink.trng.proj.ecomReg.fragment.phoneverification", this);
				this.getView().addDependent(this.dialogphone);
			}
			this.dialogphone.open();
		},
		showPassword1: function () {
			this.getView().byId("newshowpasswordid").setValue(this.loginpassword);
			this.getView().getModel("oVisibilityModel").setProperty("/showpass1", true);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn1", false);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn1", true);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass1", false);
			//this.isNumberFieldValid(this.pass, this.pass.length);
		},
		hidePassword1: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/showpass1", false);
			this.getView().getModel("oVisibilityModel").setProperty("/showpassbtn1", true);
			this.getView().getModel("oVisibilityModel").setProperty("/hidepassbtn1", false);
			this.getView().getModel("oVisibilityModel").setProperty("/addpass1", true);

		},
		OnpressCancel: function () {
			this.getView().getModel("oVisibilityModel").setProperty("/LoginPage", true);
			this.getView().getModel("oVisibilityModel").setProperty("/RegisterPage", false);
		}
	});
});