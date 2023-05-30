# DBMS를 활용한 게시판 웹 페이지 구축

이름: 오채민  
학번: 20190111

## 과제 개요
- 창원대학교 최도진 교수님의 데이터베이스 개론(2023-1) 강의 과제
- DBMS를 활용하여 게시판 웹 페이지를 구축한다.

### 기능

게시판의 기능은 다음과 같다.

| no. | 기능명 | 내용 및 조건 |
|--|--|--|
|1| 전체 게시글 조회  | - 한 페이지에 모든 게시글을 조회하지 않고, N개 단위로 나누어 페이징(SQL 구현)한다. <br> - **내용/댓글을 제외한 모든 내용**을 리스트로 확인 가능하다.|
|2 |게시글 상세 조회 |  - 모든 내용과 댓글을 조회한다.|
|3 |게시글 작성 |- 작성자, 제목, 내용, 작성일자, 고유 번호가 포함되어야 한다. |
|4 |게시글 삭제 |- 게시글은 삭제 가능하다. <br> - 게시글을 삭제하는 경우 댓글도 같이 삭제되어야 한다.|
|5 |댓글 작성 |  - 게시글에 대한 댓글을 작성할 수 있다. <br> - 댓글에 대한 댓글 기능은 제공하지 않는다. <br> - 댓글에는 작성자, 시간, 내용이 포함된다. |
|6 |댓글 삭제 |- 댓글은 삭제 가능하다. |

### 개발 환경

- RDBMS: MariaDB
- Frontend: HTML / Web Framework(사용 가능)
- Backend: node.js
  - node.js 내에서 SQL을 구현할 것(nativ한 SQL 사용)

<br>

---

## ERD

![DB_community](https://github.com/chaemino/cwnu-db-make-community/assets/107089629/275fce64-3a7e-47d1-a43d-133f74e7c08b)

<br>

---

## 개발 환경

**brew를 이용한 node.js 최신 버전 설치**

```
$ brew search node

==> Formulae
libbitcoin-node      node                 node@10              node@18              nodeenv
linode-cli           node-build           node@14              node_exporter        nodenv
llnode               node-sass            node@16              nodebrew             ode

==> Casks
capslocknodelay                    nodebox                            nodeclipse

If you meant "node" specifically:
It was migrated from homebrew/cask to homebrew/core.
```

```
ochaemin@ocms-Macmini:cwnu-db-make-community
$ brew install node@18
```

**환경 변수 설정**
- `.bashrc`

```
export PATH="/usr/local/opt/node@18/bin:$PATH"
export LDFLAGS="-L/usr/local/opt/node@18/lib"
export CPPFLAGS="-I/usr/local/opt/node@18/include"
```
