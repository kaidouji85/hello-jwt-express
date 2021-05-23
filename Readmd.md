# jwt + express 勉強

以下サイトを参考にして、jwt + expressの認証を実装しました。
各種サーバの起動方法は、参考サイトを確認してください。

参考サイト
https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

## 動かし方

### 1. ライブラリのインストール
2回目以降は、本手順は省いてもOK。

```shell
cd <本リポジトリをcloneした場所>
npm ci
```

### 2. 認証サーバ起動

```shell
cd <本リポジトリをcloneした場所>
npm start
```

### 3. booksサーバ起動

```shell
cd <本リポジトリをcloneした場所>
npm run start:book
```