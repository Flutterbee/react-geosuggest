## 1.12.0 (2016-10-18)


#### Bug Fixes

* push geolocate suggest only once ([5d4f29ee](https://github.com/ubilabs/react-geosuggest/commit/5d4f29ee5363c4710c3d8c8aeff2edf192e860f8))
* remove disabling of locality input. Firefox behaves erratically ([176791c4](https://github.com/ubilabs/react-geosuggest/commit/176791c4b1d443c2913f63a09c4929c52a96c7ad))
* pass formated address to selectSuggest ([bacb4efb](https://github.com/ubilabs/react-geosuggest/commit/bacb4efb151089e2698df13e076a65f84a6b5c21))
* enable geolocate on option ([4ab1e108](https://github.com/ubilabs/react-geosuggest/commit/4ab1e1086e42381367ec372031b0b4c42467e7b1))
* remove initial focus ([23ad2956](https://github.com/ubilabs/react-geosuggest/commit/23ad29561fd4f8ed482ba5f6900710fc9505266e))
* use placeid when available to geocode ([ec06b365](https://github.com/ubilabs/react-geosuggest/commit/ec06b365f4476c061616986b67adf8d02b4222d0))
* focus set only when value is blank ([6472d901](https://github.com/ubilabs/react-geosuggest/commit/6472d9017ba0fd8dd0103af5d728580d0ff3853b))
* remove autoshowsuggest ([596a22d0](https://github.com/ubilabs/react-geosuggest/commit/596a22d0073a9b4a2c2b74240fef3b388c7accf2))
* clear locality when sublocality is selected ([d9674ab5](https://github.com/ubilabs/react-geosuggest/commit/d9674ab58be9f5edbc72272009cb079fc994d723))
* blur input after setting only value so no results dont show up ([7a8ac99a](https://github.com/ubilabs/react-geosuggest/commit/7a8ac99aa12a09a4f1c7e84b1087310ab9a9375a))
* change edit label to change ([6a9119d7](https://github.com/ubilabs/react-geosuggest/commit/6a9119d7b37c2e6fc1178ccadb99013910b6f558))
* automatic focus and show recent suggest option ([61c41228](https://github.com/ubilabs/react-geosuggest/commit/61c4122847a94c1cec35fe2ce1474decc47768a2))
* set label for first time when selecting suggest ([fcfc5326](https://github.com/ubilabs/react-geosuggest/commit/fcfc5326c4bfa25e41965b20f59972cca629d0f5))
* not sending locality selected event when setting programmatically ([d9a79112](https://github.com/ubilabs/react-geosuggest/commit/d9a791125ef66687fe3c17f6497b65101189d89b))
* call select event on selection with placeId ([f5fdee6a](https://github.com/ubilabs/react-geosuggest/commit/f5fdee6afb08f247d783ffc543f262a8912667ab))
* remove active suggest when deleting locality ([365927e0](https://github.com/ubilabs/react-geosuggest/commit/365927e025b38a81299504157d7e2c32785bda05))
* fix incorrect location set when big locality is selected ([757f29d0](https://github.com/ubilabs/react-geosuggest/commit/757f29d0f85516e7b0974d1945d8d58b19e85afb))
* correct googleMap to googleMaps ([1073e4ed](https://github.com/ubilabs/react-geosuggest/commit/1073e4ed530f314a12c62d8c5b3d8b3713b27d3c))
* doc comments, backward compatible changes ([96cca392](https://github.com/ubilabs/react-geosuggest/commit/96cca392f5b569247523cf784d34f1e1eb8b89d8))
* add copy css in build module ([bb988a1c](https://github.com/ubilabs/react-geosuggest/commit/bb988a1c5bf3079b170cd24c79bbd21093f49f93))
* googleMaps object moved out of props and set in componentDidMount ([955812df](https://github.com/ubilabs/react-geosuggest/commit/955812dfb702e8ea6318d89b2ef36d866c5c4354))
* googleMaps object moved out of props and set in componentDidMount ([2f0f6f32](https://github.com/ubilabs/react-geosuggest/commit/2f0f6f3211d921c1ef7dd5e4325cfad3d63b5b1f))
* run prepublish in preinstall ([0ac03d45](https://github.com/ubilabs/react-geosuggest/commit/0ac03d456c7736655286d8047a280028e1452e53))
* remove src from npmignore ([69f9b945](https://github.com/ubilabs/react-geosuggest/commit/69f9b945a5a5697d4c8b2101a3b4fd172a524b00))
* googleMaps object moved out of props and set in componentDidMount ([440eba69](https://github.com/ubilabs/react-geosuggest/commit/440eba698be9e4771e5264e443e4b5e7ceb82e8d))
* **fixtures:** fix fixture filtering ([271709c6](https://github.com/ubilabs/react-geosuggest/commit/271709c6234a182d689632449e875261f7b6285e))


#### Features

* add geolocate option ([7bbe409e](https://github.com/ubilabs/react-geosuggest/commit/7bbe409e422cd2db2f09a721d454038e5655dd4c))
* focus only when there is no initial value or placeId ([13e07333](https://github.com/ubilabs/react-geosuggest/commit/13e07333b7861aaa6dfdaee0e29d2b29346aad27))
* multiline implementation, beautification and fixes ([a1341ea8](https://github.com/ubilabs/react-geosuggest/commit/a1341ea8af5ee3ee6409bbe699fb79749cb901e6))
* add edit locality button ([eba8197b](https://github.com/ubilabs/react-geosuggest/commit/eba8197b8e6ee41c264ece5ac629be7043a7eeff))
* support for setting place using placeId ([4e6b17f5](https://github.com/ubilabs/react-geosuggest/commit/4e6b17f577bef9ba00f44c6d9ea9a5d7118a3c71))
* interactions for backspace, delete button on biglocality ([7b97fa1f](https://github.com/ubilabs/react-geosuggest/commit/7b97fa1fad8cfa727ade93b7b5404ada3f935a68))
* biglocality interactions ([2e26d028](https://github.com/ubilabs/react-geosuggest/commit/2e26d02865ea401a7393556bbab4a6c73eb4b6f9))
* basic implementation of big locality and other configs ([a92db5f8](https://github.com/ubilabs/react-geosuggest/commit/a92db5f8518ccb897d270e5533e66cc4bcc0579c))


## 1.12.0 (2015-10-22)


#### Bug Fixes

* doc comments, backward compatible changes ([96cca392](https://github.com/ubilabs/react-geosuggest/commit/96cca392f5b569247523cf784d34f1e1eb8b89d8))
* add copy css in build module ([bb988a1c](https://github.com/ubilabs/react-geosuggest/commit/bb988a1c5bf3079b170cd24c79bbd21093f49f93))
* googleMaps object moved out of props and set in componentDidMount ([955812df](https://github.com/ubilabs/react-geosuggest/commit/955812dfb702e8ea6318d89b2ef36d866c5c4354))


### 1.11.1 (2015-10-12)


#### Bug Fixes

* upgrade code to 0.14, too ([c5f64d47](https://github.com/ubilabs/react-geosuggest/commit/c5f64d47befef21c620bee1db41e86ffc1592194))


## 1.11.0 (2015-10-12)


#### Features

* bump peer dependency react to 0.14.0 ([dc39828e](https://github.com/ubilabs/react-geosuggest/commit/dc39828ea46552c60ce0a5ae33a52f6eee8c8f10))
* **input:** auto activate first suggest ([d1429b86](https://github.com/ubilabs/react-geosuggest/commit/d1429b8698c8928d69135fbe948f20f7e9246956))


## 1.10.0 (2015-09-29)


#### Bug Fixes

* prevent form submit on enter press ([dda86a12](https://github.com/ubilabs/react-geosuggest/commit/dda86a124a68ccf03220afb5f1796e99f183713e), closes [#49](https://github.com/ubilabs/react-geosuggest/issues/49))

#### Features

* add skipSuggest to not show certain suggestions  ([6da568d5](https://github.com/ubilabs/react-geosuggest/commit/6da568d5c0736fad7aacf21c864e8278544a544b)
* add getSuggestLabel to define a custom label  ([5103598](https://github.com/ubilabs/react-geosuggest/commit/51035989077a0eced308ac01f7e87a646893f767)
* **input:**  add disabled prop to disable ([7100d43e](https://github.com/ubilabs/react-geosuggest/commit/7100d43e2e3750e2506c78de32985974b915bb8f)

### 1.9.1 (2015-09-25)

#### Bug Fixes

* Fix issue if the initialValue changes ([b739b5c9](https://github.com/ubilabs/react-geosuggest/commit/b739b5c9b755f0efc05e28b01eb6b595b3d3cb9d))
* Build fixes so dist/ works with a global window.React  ([9b5e4369](https://github.com/ubilabs/react-geosuggest/commit/9b5e4369f7057e95ae5a36611cf5b7932dae50de))

## 1.9.0 (2015-09-09)

#### Features

* **input:**  add onChange callbacks  ([e6555ad](https://github.com/ubilabs/react-geosuggest/commit/e6555addbe3893b129488dc0623b7198036da35d)

## 1.8.0 (2015-09-01)

#### Features

* **input:**  add method to change the value of the user input  ([44d86f5](https://github.com/ubilabs/react-geosuggest/commit/44d86f5842765b72cb3db073feb016f750898e1f)


## 1.7.0 (2015-08-19)

#### Features

* **suggests:** add individual fixture classNames ([01b0e8a](https://github.com/ubilabs/react-geosuggest/commit/01b0e8a7a3e555729aeb56292a22bd8a412e4cf9)


## 1.6.0 (2015-08-12)


#### Features

* **input:** add bounds, country and types params ([00a84866](https://github.com/ubilabs/react-geosuggest/commit/00a84866d109ce4e323705558ffe319d56ecd5b1), closes [#20](https://github.com/ubilabs/react-geosuggest/issues/20))


## 1.5.0 (2015-08-12)


#### Features

* **input:**
  * add clear method to geosuggest  ([2d38a40](https://github.com/ubilabs/react-geosuggest/commit/2d38a4072b11c900d73b5cc26615a3cc69f286b4)
  * add onFocus and onBlur callbacks ([5051bc4](https://github.com/ubilabs/react-geosuggest/commit/5051bc424a4f508fa8dcff6683c690cc1ab9c2dd)

* **example:** add onFocus and onBlur demo ([88cf7f88](https://github.com/ubilabs/react-geosuggest/commit/88cf7f8873119f667aa514b8065e116d7a3741b2))


### 1.4.3 (2015-07-29)


#### Bug Fixes

* **example:** remove drop_console option from uglify ([e8e16112](https://github.com/ubilabs/react-geosuggest/commit/e8e16112d2d0f47f7ddc005dd485a25f7d55e4e7))


### 1.4.2 (2015-07-29)


#### Bug Fixes

* **build:** fix build for npm ([6475372](https://github.com/ubilabs/react-geosuggest/commit/6475372a468f19f075a20af012f8f85404172893))



### 1.4.1 (2015-07-21)


#### Bug Fixes

* **import:** add .npmignore ([add06073](https://github.com/ubilabs/react-geosuggest/commit/add06073990bb4c8934b8ad28c6c1bfb201f6945))


## 1.4.0 (2015-07-20)


#### Bug Fixes

* **input:** allow continuous editing ([62e83cce](https://github.com/ubilabs/react-geosuggest/commit/62e83cce9ac42e23916914691fb83b829d778d7e), closes [#12](https://github.com/ubilabs/react-geosuggest/issues/12))


#### Features

* **input:**
  * add new param className ([c1c990ec](https://github.com/ubilabs/react-geosuggest/commit/c1c990ec80e5210322d7d68b805d44a73196ca4e), closes [#8](https://github.com/ubilabs/react-geosuggest/issues/8))
  * add initial value param ([f97d8eba](https://github.com/ubilabs/react-geosuggest/commit/f97d8eba377ed789c1bbc21cfc4de94e85ef2760), closes [#13](https://github.com/ubilabs/react-geosuggest/issues/13))
