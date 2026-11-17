(function () {
  var WEEK_COUNT = 14;

  function pad(week) {
    return String(week).padStart(2, "0");
  }

  function toUrl(value) {
    return new URL(value, window.location.href);
  }

  function youtubeId(value) {
    var url;
    try {
      url = toUrl(value);
    } catch (error) {
      return null;
    }

    var host = url.hostname.toLowerCase().replace(/^www\./, "");
    var id = "";

    if (host === "youtu.be") {
      // Path only. Query params such as ?is= or ?si= are not part of the id.
      id = url.pathname.split("/").filter(Boolean)[0] || "";
      id = id.split(/[?&#]/)[0];
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        id = url.searchParams.get("v") || "";
      } else {
        var parts = url.pathname.split("/").filter(Boolean);
        if (parts[0] === "shorts" || parts[0] === "embed" || parts[0] === "live") {
          id = parts[1] || "";
        }
      }
    }

    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
  }

  function vimeoId(value) {
    var url;
    try {
      url = toUrl(value);
    } catch (error) {
      return null;
    }

    var host = url.hostname.toLowerCase().replace(/^www\./, "");
    var parts = url.pathname.split("/").filter(Boolean);

    if (host === "player.vimeo.com" && parts[0] === "video" && /^\d+$/.test(parts[1] || "")) {
      return parts[1];
    }

    if (host === "vimeo.com") {
      for (var i = parts.length - 1; i >= 0; i -= 1) {
        if (/^\d+$/.test(parts[i])) return parts[i];
      }
    }

    return null;
  }

  function driveId(value) {
    var url;
    try {
      url = toUrl(value);
    } catch (error) {
      return null;
    }

    var host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "drive.google.com") return null;

    var parts = url.pathname.split("/").filter(Boolean);
    var id = "";
    if (parts[0] === "file" && parts[1] === "d") {
      id = parts[2] || "";
    } else if (parts[0] === "open") {
      id = url.searchParams.get("id") || "";
    }

    return /^[A-Za-z0-9_-]+$/.test(id) ? id : null;
  }

  function isDirectVideo(value) {
    try {
      var path = new URL(value, "http://local").pathname.toLowerCase();
      return path.endsWith(".mp4") || path.endsWith(".webm") || path.endsWith(".mov");
    } catch (error) {
      return false;
    }
  }

  function mediaForUrl(value) {
    var url = String(value || "").trim();
    if (!url) return null;

    var yt = youtubeId(url);
    if (yt) {
      return {
        type: "iframe",
        src: "https://www.youtube-nocookie.com/embed/" + yt,
        allow: "autoplay; encrypted-media; picture-in-picture",
      };
    }

    var vimeo = vimeoId(url);
    if (vimeo) {
      return { type: "iframe", src: "https://player.vimeo.com/video/" + vimeo };
    }

    var drive = driveId(url);
    if (drive) {
      return {
        type: "iframe",
        src: "https://drive.google.com/file/d/" + drive + "/preview",
        allow: "autoplay",
      };
    }

    if (isDirectVideo(url)) {
      return { type: "video", src: url };
    }

    return null;
  }

  function listedFile(names, filename) {
    return names.indexOf(filename) !== -1 || names.indexOf("videos/" + filename) !== -1;
  }

  function selfHosted(week) {
    var names = window.WEEK_FILES || [];
    var base = "week-" + pad(week);
    if (listedFile(names, base + ".mp4")) return "videos/" + base + ".mp4";
    if (listedFile(names, base + ".webm")) return "videos/" + base + ".webm";
    return null;
  }

  function fillRankingItem(li, item) {
    var nameText = item && item.name != null ? String(item.name) : "";
    var noteText = item && item.note != null ? String(item.note) : "";
    var imageSrc = item && item.image != null ? String(item.image).trim() : "";
    var subs = item && Array.isArray(item.subs) ? item.subs : [];

    if (nameText) {
      var name = document.createElement("strong");
      name.className = "name";
      name.textContent = nameText;
      li.appendChild(name);
    }
    if (nameText && noteText) li.appendChild(document.createTextNode(" "));
    if (noteText) {
      var detail = document.createElement("span");
      detail.className = "note";
      detail.textContent = noteText;
      li.appendChild(detail);
    }
    if (imageSrc) {
      var img = document.createElement("img");
      img.src = imageSrc;
      img.alt = nameText;
      img.loading = "lazy";
      li.appendChild(img);
    }
    if (!subs.length) return;

    var sub = document.createElement("ul");
    sub.className = "subs";
    subs.forEach(function (child) {
      var subLi = document.createElement("li");
      fillRankingItem(subLi, child);
      sub.appendChild(subLi);
    });
    li.appendChild(sub);
  }

  function renderTile(week, media) {
    var article = document.createElement("article");
    article.className = "tile";
    article.dataset.week = String(week);
    article.setAttribute("aria-label", "Week " + week);

    var heading = document.createElement("h2");
    heading.textContent = "Week " + week;

    var frame = document.createElement("div");
    frame.className = "frame";

    if (media && media.type === "rankings") {
      article.dataset.kind = "rankings";
      frame.classList.add("rankings");
      if (media.intro) {
        var intro = document.createElement("p");
        intro.className = "intro";
        intro.textContent = media.intro;
        frame.appendChild(intro);
      }
      var list = document.createElement("ol");
      media.rankings.forEach(function (item) {
        var li = document.createElement("li");
        fillRankingItem(li, item);
        list.appendChild(li);
      });
      frame.appendChild(list);

      var details = document.createElement("details");
      var summary = document.createElement("summary");
      var action = document.createElement("span");
      var show = document.createElement("span");
      var hide = document.createElement("span");
      action.className = "expand";
      show.className = "when-closed";
      show.textContent = "Show rankings";
      hide.className = "when-open";
      hide.textContent = "Hide rankings";
      action.appendChild(show);
      action.appendChild(hide);
      summary.appendChild(heading);
      summary.appendChild(action);
      details.appendChild(summary);
      details.appendChild(frame);
      article.appendChild(details);
      return article;
    }

    if (!media) {
      article.dataset.kind = "placeholder";
      frame.classList.add("placeholder");
      var note = document.createElement("p");
      note.textContent = "Coming soon";
      frame.appendChild(note);
    } else if (media.type === "iframe") {
      article.dataset.kind = "iframe";
      var iframe = document.createElement("iframe");
      iframe.src = media.src;
      iframe.title = "Week " + week + " video";
      iframe.allow = media.allow ||
        "autoplay; encrypted-media; picture-in-picture";
      if (!iframe.allowFullscreen) iframe.allowFullscreen = true;
      iframe.setAttribute("allowfullscreen", "");
      iframe.loading = "lazy";
      frame.appendChild(iframe);
    } else {
      article.dataset.kind = "video";
      var video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.src = media.src;
      frame.appendChild(video);
    }

    article.appendChild(heading);
    article.appendChild(frame);
    return article;
  }

  function weekEntry(week) {
    var map = window.WEEK_VIDEOS || {};
    return map[week];
  }

  function rankingsFrom(entry) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
    if (!Array.isArray(entry.rankings) || entry.rankings.length === 0) return null;
    return entry.rankings;
  }

  function main() {
    var grid = document.getElementById("grid");
    var status = document.getElementById("status");
    var weeks = [];
    var week;

    for (week = 1; week <= WEEK_COUNT; week += 1) weeks.push(week);

    var tiles = weeks.map(function (n) {
      var entry = weekEntry(n);
      var rankings = rankingsFrom(entry);
      if (rankings) {
        var intro = entry.intro != null ? String(entry.intro).trim() : "";
        return renderTile(n, { type: "rankings", rankings: rankings, intro: intro });
      }
      if (typeof entry === "string") {
        var linked = mediaForUrl(entry);
        if (linked) return renderTile(n, linked);
      }
      var local = selfHosted(n);
      if (local) return renderTile(n, { type: "video", src: local });
      return renderTile(n, null);
    });
    grid.replaceChildren.apply(grid, tiles);
    grid.hidden = false;
    if (status) status.remove();
  }

  window.mediaForUrl = mediaForUrl;
  main();
})();
