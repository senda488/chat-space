# DATABASE設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|

### Association
- has_many :messages, dependent: :nullify
- has_many :users_groups
- has_many :groups,  through: :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false|
|group_id|integer|null: false|

### Associstion
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users_groups
- has_many :users,  through: :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|string|null: false|
|group_id|string|null: false|

### Association
- belongs_to :user
- belongs_to :group

