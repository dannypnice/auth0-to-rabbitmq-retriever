module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=29)}([function(e,t){e.exports=require("auth0-extension-tools@1.3.1")},function(e,t,r){"use strict";e.exports=r(0).config()},function(e,t,r){const n=r(22),o=r(5),i=r(15),s=r(21);e.exports.createServer=n.createServer,e.exports.urlHelpers=o,e.exports.middlewares=i,e.exports.routes=s},function(e,t,r){"use strict";var n=r(51);n.emitErrs=!0;var o=new n.Logger({transports:[new n.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=o,e.exports.stream={write:function(e){o.info(e.replace(/\n$/,""))}}},function(e,t){e.exports=require("express@4.12.4")},function(e,t,r){function n(e){if(!e.container)return null;const t=e.container.replace(c,"\\$&"),r=e.jtn?e.jtn.replace(c,"\\$&"):"";if(e.url_format===u)return new RegExp("^/api/run/"+t+"/(?:"+r+"/?)?");if(e.url_format===a)return new RegExp("^/"+t+"/(?:"+r+"/?)?");if(e.url_format===s)return new RegExp("^/(?:"+r+"/?)?");throw new Error("Unsupported webtask URL format.")}function o(e,t){if(!e)return null;const r=e.indexOf("sandbox8")>=0?"8":"";return"https://"+t+"."+(e.split(".it.auth0.com")[0].split("-")[1]||"us")+r+".webtask.io/"}const i=r(10),s=3,a=2,u=1,c=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,l=function(e,t){var r=i.parse(e).pathname||"";return r=r.replace(t,"").replace(/^\/|\/$/g,""),r.startsWith("/")||(r="/"+r),r.endsWith("/")||(r+="/"),r};e.exports.getBasePath=function(e){return l(e.originalUrl||"",e.path)},e.exports.getBaseUrl=function(e,t){var r=t;const n=i.parse(e.originalUrl||"").pathname||"";return i.format({protocol:r||"https",host:e.headers.host,pathname:n.replace(e.path,"").replace(/\/$/g,"")})},e.exports.getWebtaskUrl=function(e){const t=n(e.x_wt),r=e.url,s=e.url.replace(t,"/"),a=i.parse(s||"").pathname,u=e.x_wt&&e.x_wt.ectx&&e.x_wt.ectx.ISOLATED_DOMAIN||!1,c=i.parse(r||"").pathname||"";var l;if(u){l=i.format({protocol:"https",host:e.headers.host,pathname:c.replace(a,"").replace(/\/$/g,"")});const d=".it.auth0.com/api/run/"+e.x_wt.container+"/",p=o(l,e.x_wt.container);l.indexOf(d)>=0&&(l=l.replace("https://"+e.headers.host+"/api/run/"+e.x_wt.container+"/",p))}else l=c;return l}},function(e,t,r){"use strict";var n=r(38);e.exports=function(e,t,r){return function(o,i,s){var a=n(s);return!0===e||"function"==typeof e&&e(o,i,a)?t(o,i,a):r?r(o,i,a):a()}}},function(e,t,r){"use strict";function n(e){this.message=e}var o=r(37);n.prototype=new Error,n.prototype.name="InvalidTokenError",e.exports=function(e,t){if("string"!=typeof e)throw new n("Invalid token specified");t=t||{};var r=!0===t.header?0:1;try{return JSON.parse(o(e.split(".")[r]))}catch(e){throw new n("Invalid token specified: "+e.message)}},e.exports.InvalidTokenError=n},function(e,t){e.exports=require("express-jwt@3.1.0")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("url")},function(e,t,r){"use strict";(function(t){var n=(r(10),r(9)),o=r(49),i=r(4),s=r(40),a=r(0),u=r(2),c=r(27),l=r(28),d=r(25),p=r(3),f=r(1),h=r(23);e.exports=function(e,r){f.setProvider(e);var g=r?new a.WebtaskStorageContext(r,{force:1}):new a.FileStorageContext(n.join(t,"./data.json"),{mergeWrites:!0}),v=new i;v.use(o(":method :url :status :response-time ms - :res[content-length]",{stream:p.stream}));var x=function(e){return function(t,r,n){return t.webtaskContext&&t.webtaskContext.body?(t.body=t.webtaskContext.body,n()):e(t,r,n)}};return v.use(x(s.json())),v.use(x(s.urlencoded({extended:!1}))),v.use(u.routes.dashboardAdmins({secret:f("EXTENSION_SECRET"),audience:"urn:logs-to-provider",rta:f("AUTH0_RTA").replace("https://",""),domain:f("AUTH0_DOMAIN"),baseUrl:f("PUBLIC_WT_URL")||f("WT_URL"),clientName:"Logs to Any Provider",urlPrefix:"",sessionStorageKey:"logs-to-provider:apiToken"})),v.use("/meta",l()),v.use("/.extensions",d()),v.use("/app",i.static(n.join(t,"../dist"))),v.use(h(g)),v.use("/",c(g)),v.use(u.middlewares.errorHandler(p.error.bind(p))),v}}).call(t,"/")},function(e,t,r){const n=r(7),o=r(8),i=r(0),s=r(6);e.exports=function(e){if(!e||"object"!=typeof e)throw new i.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new i.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.audience||0===e.audience.length)throw new i.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.baseUrl||void 0===e.baseUrl)throw new i.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new i.ArgumentError("The provided base URL is invalid: "+e.baseUrl);const t=o({audience:e.audience,issuer:e.baseUrl,secret:e.secret,algorithms:["HS256"],credentialsRequired:e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return s(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss===t.baseUrl}catch(e){return!1}return!1},r)}},function(e,t,r){const n=r(7),o=r(8),i=r(46),s=r(0),a=r(6),u=r(0).UnauthorizedError;e.exports=function(e){if(!e||"object"!=typeof e)throw new s.ArgumentError("Must provide the options");if(null===e.domain||void 0===e.domain)throw new s.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new s.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.audience||void 0===e.audience)throw new s.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new s.ArgumentError("The provided audience is invalid: "+e.audience);const t=o({secret:i.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:"https://"+e.domain+"/.well-known/jwks.json",handleSigningKeyError:function(e,t){return t(e instanceof i.SigningKeyNotFoundError?new u("A token was provided with an invalid kid"):e)}}),audience:e.audience,issuer:"https://"+e.domain+"/",algorithms:["RS256"],credentialsRequired:e&&e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return a(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss==="https://"+t.domain+"/"}catch(e){return!1}return!1},r)}},function(e,t,r){e.exports=function(e){return function(t,r,n,o){return e&&e(t),t&&t.status?(n.status(t.status),n.json({error:t.code||t.name,message:t.message||t.name})):(n.status(t.status||500),n.json({error:"InternalServerError",message:t.message||t.name}))}}},function(e,t,r){e.exports.authenticateAdmins=r(12),e.exports.authenticateUsers=r(13),e.exports.requireAuthentication=r(17),e.exports.errorHandler=r(14),e.exports.managementApiClient=r(16),e.exports.validateHookToken=r(18),e.exports.webtaskConfig=r(19)},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){const i=t,s=t.user&&t.user.access_token&&t.user.access_token.length,a=s?{domain:e.domain,accessToken:t.user.access_token}:e;n.managementApi.getClient(a).then(function(e){return i.auth0=e,o(),null}).catch(function(e){o(e)})}}},function(e,t,r){const n=r(0).UnauthorizedError;e.exports=function(e,t,r){return e.user?r():r(new n("Authentication required for this endpoint."))}},function(e,t,r){const n=r(0);e.exports=function(e,t,r){if(null===e||void 0===e)throw new n.ArgumentError("Must provide the domain");if("string"!=typeof e||0===e.length)throw new n.ArgumentError("The provided domain is invalid: "+e);if(null===t||void 0===t)throw new n.ArgumentError("Must provide the webtaskUrl");if("string"!=typeof t||0===t.length)throw new n.ArgumentError("The provided webtaskUrl is invalid: "+t);if(null===r||void 0===r)throw new n.ArgumentError("Must provide the extensionSecret");if("string"!=typeof r||0===r.length)throw new n.ArgumentError("The provided extensionSecret is invalid: "+r);return function(o){if(null===o||void 0===o)throw new n.ArgumentError("Must provide the hookPath");if("string"!=typeof o||0===o.length)throw new n.ArgumentError("The provided hookPath is invalid: "+o);return function(i,s,a){if(i.headers.authorization&&"Bearer"===i.headers.authorization.split(" ")[0]){const u=i.headers.authorization.split(" ")[1];try{if(n.validateHookToken(e,t,o,r,u))return a()}catch(e){return a(e)}}return a(new n.HookTokenError("Hook token missing for the call to: "+o))}}}},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){return t.webtaskContext&&e.setProvider(n.configProvider.fromWebtaskContext(t.webtaskContext)),o()}}},function(e,t,r){const n=r(4),o=r(42),i=r(31),s=r(45),a=r(0),u=r(5);e.exports=function(e){if(!e||"object"!=typeof e)throw new a.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new a.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new a.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new a.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new a.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.rta||void 0===e.rta)throw new a.ArgumentError("Must provide a valid rta");if("string"!=typeof e.rta||0===e.rta.length)throw new a.ArgumentError("The provided rta is invalid: "+e.rta);if(null===e.domain||void 0===e.domain)throw new a.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new a.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.baseUrl||void 0===e.baseUrl)throw new a.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new a.ArgumentError("The provided base URL is invalid: "+e.baseUrl);if(null===e.clientName||void 0===e.clientName)throw new a.ArgumentError("Must provide a valid client name");if("string"!=typeof e.clientName||0===e.clientName.length)throw new a.ArgumentError("The provided client name is invalid: "+e.clientName);if(void 0!==e.storageType&&"sessionStorage"!==e.storageType&&"localStorage"!==e.storageType)throw new a.ArgumentError('The storageType must be either "sessionStorage" or "localStorage". Incorrect storageType: '+e.storageType);const t=e.stateKey||"state",r=e.nonceKey||"nonce",c=e.urlPrefix||"",l=e.storageType||"sessionStorage",d=e.storageKey||e.sessionStorageKey||"apiToken",p=new a.SessionManager(e.rta,e.domain,e.baseUrl),f=n.Router();return f.get(c+"/login",function(n,i){const s=u.getBasePath(n),a=o.randomBytes(16).toString("hex"),l=o.randomBytes(16).toString("hex");i.cookie(t,a,{path:s}),i.cookie(r,l,{path:s});const d=p.createAuthorizeUrl({redirectUri:u.getBaseUrl(n)+c+"/login/callback",scopes:e.scopes,expiration:e.expiration,nonce:l,state:a});i.redirect(d)}),f.post(c+"/login/callback",i(),function(n,o,i){var c;try{c=s.decode(n.body.id_token)}catch(e){c=null}if(!c)return i(new a.ValidationError("Login failed. Invalid token."));if(!n.cookies||n.cookies[r]!==c.nonce)return i(new a.ValidationError("Login failed. Nonce mismatch."));if(!n.cookies||n.cookies[t]!==n.body.state)return i(new a.ValidationError("Login failed. State mismatch."));const f=u.getBasePath(n);return p.create(n.body.id_token,n.body.access_token,{secret:e.secret,issuer:e.baseUrl,audience:e.audience,noAccessToken:e.noAccessToken}).then(function(e){o.clearCookie(t,{path:f}),o.clearCookie(r,{path:f}),o.header("Content-Type","text/html"),o.status(200).send('<html><head><script type="text/javascript">'+l+'.setItem("'+d+'", "'+e+'");window.location.href = "'+u.getBaseUrl(n)+'";<\/script></head></html>')}).catch(function(e){i(e)})}),f.get(c+"/logout",function(n,o){const i=u.getBasePath(n),s=encodeURIComponent(u.getBaseUrl(n));o.clearCookie(t,{path:i}),o.clearCookie(r,{path:i}),o.header("Content-Type","text/html"),o.status(200).send('<html><head><script type="text/javascript">'+l+'.removeItem("'+d+'");window.location.href = "https://'+e.rta+"/v2/logout/?returnTo="+s+"&client_id="+s+'";<\/script></head></html>')}),f.get("/.well-known/oauth2-client-configuration",function(t,r){r.header("Content-Type","application/json"),r.status(200).send({redirect_uris:[u.getBaseUrl(t)+c+"/login/callback"],client_name:e.clientName,post_logout_redirect_uris:[u.getBaseUrl(t)]})}),f}},function(e,t,r){e.exports.dashboardAdmins=r(20)},function(e,t,r){const n=r(0),o=r(50);e.exports.createServer=function(e){const t=n.createServer(e);var r=null;return o.fromExpress(function(e,n){return r||(r=t(e.webtaskContext)),r(e,n)})}},function(e,t,r){"use strict";var n=r(48),o=r(39),i=r(3),s=r(1),a=r(24);e.exports=function(e){return function(t,r,u){var c=t.webtaskContext&&t.webtaskContext.body||t.body||{},l=t.webtaskContext&&t.webtaskContext.headers||{};if(!(c.schedule&&"active"===c.state||"https://manage.auth0.com/"===l.referer&&l["if-none-match"]))return u();var d=a(),p=function(e,t){var r=process.hrtime();d(e,function(e){var n=process.hrtime(r),o=1e3*n[0]+n[1]/1e6;i.info("Finished request to 'rabbitmq' in "+o+"ms."),t(e)})},f={hook:s("SLACK_INCOMING_WEBHOOK_URL"),username:"auth0-logs-to-rabbitmq",title:"Logs Export"},h=new o.reporters.SlackReporter(f),g={domain:s("AUTH0_DOMAIN"),clientId:s("AUTH0_CLIENT_ID"),clientSecret:s("AUTH0_CLIENT_SECRET"),batchSize:parseInt(s("BATCH_SIZE")),startFrom:s("START_FROM"),logTypes:s("LOG_TYPES"),logLevel:s("LOG_LEVEL"),logger:i};(!g.batchSize||g.batchSize>100)&&(g.batchSize=100),g.logTypes&&!Array.isArray(g.logTypes)&&(g.logTypes=g.logTypes.replace(/\s/g,"").split(","));var v=new o.LogsProcessor(e,g),x=function(t){var r=new Date,n=r.getTime(),o=n-864e5;v.getReport(o,n).then(function(e){return h.send(e,e.checkpoint)}).then(function(){return e.read()}).then(function(r){return r.lastReportDate=t,e.write(r)})},m=function(){e.read().then(function(e){var t=n().format("DD-MM-YYYY"),r=s("DAILY_REPORT_TIME")||16;e.lastReportDate!==t&&(new Date).getHours()>=r&&x(t)})};return function(){return e.read().then(function(t){return t.lastRun=new Date,e.write(t)})}().then(function(){return v.run(p).then(function(e){e&&e.status&&e.status.error?h.send(e.status,e.checkpoint):!0!==s("SLACK_SEND_SUCCESS")&&"true"!==s("SLACK_SEND_SUCCESS")||h.send(e.status,e.checkpoint),m(),r.json(e)}).catch(function(e){h.send({error:e,logsProcessed:0},null),m(),u(e)})})}}},function(e,t,r){"use strict";var n=r(30),o=function(e){return e&&e.__esModule?e:{default:e}}(n),i=r(1),s=r(3),a=r(!function(){var e=new Error('Cannot find module "amqplib"');throw e.code="MODULE_NOT_FOUND",e}());e.exports=function(){var e={protocol:i("RABBITMQ_URI_PROTOCOL")||"amqp",hostname:i("RABBITMQ_URI_HOSTNAME")||"localhost",port:i("RABBITMQ_URI_PORT")||5672,username:i("RABBITMQ_URI_USER")||"guest",password:i("RABBITMQ_URI_PASSWORD")||"guest",locale:i("RABBITMQ_URI_LOCALE")||"en_US",frameMax:i("RABBITMQ_URI_FRAMEMAX")||0,heartbeat:i("RABBITMQ_URI_HEARTBEAT")||0,vhost:i("RABBITMQ_URI_VHOST")||"/"},t=i("RABBITMQ_URI_EXCHANGE")||"logging.application.auth0",r=i("RABBITMQ_URI_ROUTINGKEY")||"",n=a.connect(e),u=n.createChannel();return function(e,n){return e&&e.length?(s.info("Sending "+e.length+" logs to RabbitMQ."),u.assertExchange(t,"topic",{durable:!0}).then(function(){e.forEach(function(e){var n=(0,o.default)(e);u.publish(t,r,Buffer.from(n))})})):n()}}},function(e,t,r){"use strict";var n=r(4).Router,o=r(2).middlewares,i=r(1),s=r(3);e.exports=function(){var e=n(),t=o.validateHookToken(i("AUTH0_DOMAIN"),i("WT_URL"),i("EXTENSION_SECRET"));return e.use("/on-uninstall",t("/.extensions/on-uninstall")),e.use(o.managementApiClient({domain:i("AUTH0_DOMAIN"),clientId:i("AUTH0_CLIENT_ID"),clientSecret:i("AUTH0_CLIENT_SECRET")})),e.delete("/on-uninstall",function(e,t){var r=i("AUTH0_CLIENT_ID");e.auth0.clients.delete({client_id:r}).then(function(){s.debug("Deleted client "+r),t.sendStatus(204)}).catch(function(e){s.debug("Error deleting client: "+i("AUTH0_CLIENT_ID")),s.error(e),t.sendStatus(204)})}),e}},function(e,t,r){"use strict";(function(t){var n=(r(44),r(43)),o=(r(9),r(2).urlHelpers),i=r(1);e.exports=function(){var e='\n  <!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <title><%= config.TITLE %></title>\n    <meta charset="UTF-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/4.6.13/lib/logos/img/favicon.png">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.1672/css/index.min.css" />\n    <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/4.6.13/index.min.css" />\n    <% if (assets.style) { %><link rel="stylesheet" type="text/css" href="/app/<%= assets.style %>" /><% } %>\n    <% if (assets.useCdn) { %><link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-logs-to-provider/assets/auth0-logs-to-provider.ui.css" /><% } %>\n    <% if (assets.customCss) { %><link rel="stylesheet" type="text/css" href="<%= assets.customCss %>" /><% } %>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="text/javascript" src="//cdn.auth0.com/w2/auth0-7.0.4.min.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.1672/js/bundle.js"><\/script>\n    <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n    <% if (assets.vendors) { %><script type="text/javascript" src="/app/<%= assets.vendors %>"><\/script><% } %>\n    <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"><\/script><% } %>\n    <% if (assets.useCdn) { %>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-provider/assets/auth0-logs-to-provider.ui.vendors.js"><\/script>\n    <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-logs-to-provider/assets/auth0-logs-to-provider.ui.js"><\/script>\n    <% } %>\n  </body>\n  </html>\n  ';return function(t,r,s){if(0===t.url.indexOf("/api"))return s();var a={AUTH0_DOMAIN:i("AUTH0_DOMAIN"),AUTH0_CLIENT_ID:i("EXTENSION_CLIENT_ID"),AUTH0_MANAGE_URL:i("AUTH0_MANAGE_URL")||"https://manage.auth0.com",BASE_URL:o.getBaseUrl(t),BASE_PATH:o.getBasePath(t),TITLE:i("TITLE")};return r.send(n.render(e,{config:a,assets:{customCss:i("CUSTOM_CSS"),useCdn:!0}}))}}}).call(t,"/")},function(e,t,r){"use strict";var n=r(47),o=r(4).Router,i=r(2).middlewares,s=r(1),a=r(26);e.exports=function(e){var t=o(),r=i.authenticateAdmins({credentialsRequired:!0,secret:s("EXTENSION_SECRET"),audience:"urn:logs-to-provider",baseUrl:s("PUBLIC_WT_URL")||s("WT_URL"),onLoginSuccess:function(e,t,r){return r()}});return t.get("/",a()),t.get("/api/report",r,function(t,r,o){return e.read().then(function(e){var o=e&&e.lastRun,i=e&&e.logs?n.orderBy(e.logs,"start","desc"):[],s=t.query.filter&&"errors"===t.query.filter?n.filter(i,function(e){return!!e.error}):i,a=t.query.page&&parseInt(t.query.page)?parseInt(t.query.page)-1:0,u=t.query.per_page&&parseInt(t.query.per_page)||10,c=u*a;return r.json({logs:s.slice(c,c+u),total:s.length,lastRun:o})}).catch(o)}),t}},function(e,t,r){"use strict";var n=r(4),o=r(35);e.exports=function(){var e=n.Router();return e.get("/",function(e,t){t.status(200).send(o)}),e}},function(e,t,r){"use strict";var n=r(2),o=r(11),i=r(1),s=r(3),a=n.createServer(function(e,t){return s.info("Starting Logs to Cloudwatch extension - Version:","0.0.1"),o(e,t)});e.exports=function(e,t,r){t.x_wt&&t.x_wt.ectx&&t.x_wt.ectx.PUBLIC_WT_URL||!1||i.setValue("PUBLIC_WT_URL",n.urlHelpers.getWebtaskUrl(t)),a(e,t,r)}},function(e,t,r){e.exports={default:r(33),__esModule:!0}},function(e,t,r){"use strict";function n(e,t){return function(r,n,o){if(r.cookies)return o();var s=r.headers.cookie,c=!e||Array.isArray(e)?e||[]:[e];if(r.secret=c[0],r.cookies=Object.create(null),r.signedCookies=Object.create(null),!s)return o();r.cookies=u.parse(s,t),0!==c.length&&(r.signedCookies=a(r.cookies,c),r.signedCookies=i(r.signedCookies)),r.cookies=i(r.cookies),o()}}function o(e){if("string"==typeof e&&"j:"===e.substr(0,2))try{return JSON.parse(e.slice(2))}catch(e){return}}function i(e){for(var t,r,n=Object.keys(e),i=0;i<n.length;i++)t=n[i],(r=o(e[t]))&&(e[t]=r);return e}function s(e,t){if("string"==typeof e){if("s:"!==e.substr(0,2))return e;for(var r=!t||Array.isArray(t)?t||[]:[t],n=0;n<r.length;n++){var o=c.unsign(e.slice(2),r[n]);if(!1!==o)return o}return!1}}function a(e,t){for(var r,n,o,i=Object.keys(e),a=Object.create(null),u=0;u<i.length;u++)n=i[u],o=e[n],r=s(o,t),o!==r&&(a[n]=r,delete e[n]);return a}var u=r(32),c=r(41);e.exports=n,e.exports.JSONCookie=o,e.exports.JSONCookies=i,e.exports.signedCookie=s,e.exports.signedCookies=a},function(e,t,r){"use strict";function n(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},n=t||{},o=e.split(u),a=n.decode||s,c=0;c<o.length;c++){var l=o[c],d=l.indexOf("=");if(!(d<0)){var p=l.substr(0,d).trim(),f=l.substr(++d,l.length).trim();'"'==f[0]&&(f=f.slice(1,-1)),void 0==r[p]&&(r[p]=i(f,a))}}return r}function o(e,t,r){var n=r||{},o=n.encode||a;if("function"!=typeof o)throw new TypeError("option encode is invalid");if(!c.test(e))throw new TypeError("argument name is invalid");var i=o(t);if(i&&!c.test(i))throw new TypeError("argument val is invalid");var s=e+"="+i;if(null!=n.maxAge){var u=n.maxAge-0;if(isNaN(u))throw new Error("maxAge should be a Number");s+="; Max-Age="+Math.floor(u)}if(n.domain){if(!c.test(n.domain))throw new TypeError("option domain is invalid");s+="; Domain="+n.domain}if(n.path){if(!c.test(n.path))throw new TypeError("option path is invalid");s+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");s+="; Expires="+n.expires.toUTCString()}if(n.httpOnly&&(s+="; HttpOnly"),n.secure&&(s+="; Secure"),n.sameSite){switch("string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite){case!0:s+="; SameSite=Strict";break;case"lax":s+="; SameSite=Lax";break;case"strict":s+="; SameSite=Strict";break;default:throw new TypeError("option sameSite is invalid")}}return s}function i(e,t){try{return t(e)}catch(t){return e}}t.parse=n,t.serialize=o;var s=decodeURIComponent,a=encodeURIComponent,u=/; */,c=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/},function(e,t,r){var n=r(34),o=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},function(e,t){var r=e.exports={version:"2.5.5"};"number"==typeof __e&&(__e=r)},function(e,t){e.exports={author:"auth0",type:"cron",category:"log_export",initialUrlPath:"/login",repository:"https://github.com/auth0-extensions/auth0-logs-to-provider",keywords:["auth0","extension"],schedule:"0 */5 * * * *",auth0:{createClient:!0,onUninstallPath:"/.extensions/on-uninstall",scopes:"read:logs delete:clients"},secrets:{BATCH_SIZE:{description:"The amount of logs to batch before sending. A single cron execution will send multiple batches.",default:100},START_FROM:{description:"Checkpoint ID of log to start from."},SLACK_INCOMING_WEBHOOK_URL:{description:"Slack Incoming Webhook URL used to report statistics and possible failures"},SLACK_SEND_SUCCESS:{description:"This setting will enable verbose notifications to Slack which are useful for troubleshooting",type:"select",allowMultiple:!1,default:"false",options:[{value:"false",text:"No"},{value:"true",text:"Yes"}]},LOG_LEVEL:{description:"This allows you to specify the log level of events that need to be sent. Selected level includes all levels above.",type:"select",allowMultiple:!1,options:[{value:"-",text:""},{value:"4",text:"Critical"},{value:"3",text:"Error"},{value:"2",text:"Warning"},{value:"1",text:"Info"},{value:"0",text:"Debug"}]},LOG_TYPES:{description:"If you only want to send events with a specific type (eg: failed logins)",type:"select",allowMultiple:!0,options:[{text:"",value:"-"},{text:"Success Login",value:"s"},{text:"Success Silent Auth",value:"ssa"},{text:"Failed Silent Auth",value:"fsa"},{text:"Success Exchange",value:"seacft"},{text:"Failed Exchange",value:"feacft"},{text:"Success Exchange",value:"seccft"},{text:"Failed Exchange",value:"feccft"},{text:"Success Exchange",value:"sepft"},{text:"Failed Exchange",value:"fepft"},{text:"Success Exchange",value:"sertft"},{text:"Failed Exchange",value:"fertft"},{text:"Success Exchange",value:"seoobft"},{text:"Failed Exchange",value:"feoobft"},{text:"Success Exchange",value:"seotpft"},{text:"Failed Exchange",value:"feotpft"},{text:"Success Exchange",value:"sercft"},{text:"Failed Exchange",value:"fercft"},{text:"Failed Login",value:"f"},{text:"Warning",value:"w"},{text:"Deprecation Notice",value:"depnote"},{text:"Deleted User",value:"du"},{text:"Failed Login (invalid email/username)",value:"fu"},{text:"Failed Login (wrong password)",value:"fp"},{text:"Failed by Connector",value:"fc"},{text:"Failed by CORS",value:"fco"},{text:"Connector Online",value:"con"},{text:"Connector Offline",value:"coff"},{text:"Failed Connector Provisioning",value:"fcpro"},{text:"Success Signup",value:"ss"},{text:"Failed Signup",value:"fs"},{text:"Code Sent",value:"cs"},{text:"Code/Link Sent",value:"cls"},{text:"Success Verification Email",value:"sv"},{text:"Failed Verification Email",value:"fv"},{text:"Success Change Password",value:"scp"},{text:"Failed Change Password",value:"fcp"},{text:"Success Post Change Password Hook",value:"scph"},{text:"Failed Post Change Password Hook",value:"fcph"},{text:"Success Change Email",value:"sce"},{text:"Failed Change Email",value:"fce"},{text:"Success Change Username",value:"scu"},{text:"Failed Change Username",value:"fcu"},{text:"Success Change Phone Number",value:"scpn"},{text:"Failed Change Phone Number",value:"fcpn"},{text:"Success Verification Email Request",value:"svr"},{text:"Failed Verification Email Request",value:"fvr"},{text:"Success Change Password Request",value:"scpr"},{text:"Failed Change Password Request",value:"fcpr"},{text:"Failed Sending Notification",value:"fn"},{text:"API Operation",value:"sapi"},{text:"Failed API Operation",value:"fapi"},{text:"Blocked Account",value:"limit_wc"},{text:"Blocked IP Address",value:"limit_mu"},{text:"Too Many Calls to /userinfo",value:"limit_ui"},{text:"Rate Limit On API",value:"api_limit"},{text:"Too Many Calls to /delegation",value:"limit_delegation"},{text:"Successful User Deletion",value:"sdu"},{text:"Failed User Deletion",value:"fdu"},{text:"Auth0 Update Launched",value:"admin_update_launch"},{text:"Auth0 OS Update Started",value:"sys_os_update_start"},{text:"Auth0 OS Update Ended",value:"sys_os_update_end"},{text:"Auth0 Update Started",value:"sys_update_start"},{text:"Auth0 Update Ended",value:"sys_update_end"},{text:"Success Logout",value:"slo"},{text:"Failed Logout",value:"flo"},{text:"Success Delegation",value:"sd"},{text:"Failed Delegation",value:"fd"},{text:"Unenroll device account",value:"gd_unenroll"},{text:"Update device account",value:"gd_update_device_account"},{text:"Module switch",value:"gd_module_switch"},{text:"Guardian tenant update",value:"gd_tenant_update"},{text:"Second factor started",value:"gd_start_auth"},{text:"Enroll started",value:"gd_start_enroll"},{text:"MFA Enrollment start failed",value:"gd_start_enroll_failed"},{text:"User delete",value:"gd_user_delete"},{text:"OTP Auth suceed",value:"gd_auth_succeed"},{text:"OTP Auth failed",value:"gd_auth_failed"},{text:"Push notification sent",value:"gd_send_pn"},{text:"Error sending MFA Push Notification",value:"gd_send_pn_failure"},{text:"OTP Auth rejected",value:"gd_auth_rejected"},{text:"Recovery succeed",value:"gd_recovery_succeed"},{text:"Recovery failed",value:"gd_recovery_failed"},{text:"SMS Sent",value:"gd_send_sms"},{text:"Error sending MFA SMS",value:"gd_send_sms_failure"},{text:"Too many failures",value:"gd_otp_rate_limit_exceed"},{text:"Too many failures",value:"gd_recovery_rate_limit_exceed"},{text:"Guardian enrollment complete",value:"gd_enrollment_complete"},{text:"Users import",value:"fui"},{text:"Users import",value:"sui"},{text:"Breached password",value:"pwd_leak"},{text:"Failed cross origin authentication",value:"fcoa"},{text:"Success cross origin authentication",value:"scoa"},{text:"Account unblocked",value:"ublkdu"}]},RABBITMQ_URI_HOSTNAME:{description:"RabbitMQ instance hostname",example:"localhost",required:!0},RABBITMQ_URI_PROTOCOL:{description:"RabbitMQ protocol",example:"amqp",required:!0},RABBITMQ_URI_PORT:{description:"RabbitMQ Port",required:!0},RABBITMQ_URI_USER:{description:"RabbitMQ User",required:!0},RABBITMQ_URI_PASSWORD:{description:"RabbitMQ Password",type:"password"},RABBITMQ_URI_LOCALE:{description:"RabbitMQ locale"},RABBITMQ_URI_FRAMEMAX:{description:"RabbitMQ frameMax"},RABBITMQ_URI_HEARTBEAT:{description:"RabbitMQ heartbeat"},RABBITMQ_URI_VHOST:{description:"RabbitMQ vhost"},RABBITMQ_URI_EXCHANGE:{description:"RabbitMQ exchange"},RABBITMQ_URI_ROUTINGKEY:{description:"RabbitMQ routing key"}},title:"Auth0 Logs to RABBITMQ",name:"auth0-logs-to-RABBITMQ",version:"0.0.1",preVersion:"0.0.0",description:"This extension will export Auth0 to RabbitMQ"}},function(e,t){function r(e){this.message=e}function n(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new r("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,i,s=0,a=0,u="";i=t.charAt(a++);~i&&(n=s%4?64*n+i:i,s++%4)?u+=String.fromCharCode(255&n>>(-2*s&6)):0)i=o.indexOf(i);return u}var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.prototype=new Error,r.prototype.name="InvalidCharacterError",e.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||n},function(e,t,r){function n(e){return decodeURIComponent(o(e).replace(/(.)/g,function(e,t){var r=t.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r}))}var o=r(36);e.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return n(t)}catch(e){return o(t)}}},function(e,t,r){function n(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function o(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},r=e.name||"Function wrapped with `once`";return t.onceError=r+" shouldn't be called more than once",t.called=!1,t}var i=r(52);e.exports=i(n),e.exports.strict=i(o),n.proto=n(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return n(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return o(this)},configurable:!0})})},function(e,t){e.exports=require("auth0-log-extension-tools@1.3.6")},function(e,t){e.exports=require("body-parser@1.12.4")},function(e,t){e.exports=require("cookie-signature@1.0.6")},function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("ejs@2.3.1")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("jsonwebtoken@7.1.9")},function(e,t){e.exports=require("jwks-rsa@1.1.1")},function(e,t){e.exports=require("lodash@4.8.2")},function(e,t){e.exports=require("moment@2.10.3")},function(e,t){e.exports=require("morgan@1.5.3")},function(e,t){e.exports=require("webtask-tools")},function(e,t){e.exports=require("winston@1.0.0")},function(e,t){e.exports=require("wrappy@1.0.1")}]);