#!/usr/bin/env python3
import json
import re
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup, NavigableString


ROOT = Path(__file__).resolve().parents[1]
CACHE_FILE = ROOT / "tools" / "translation-cache.json"
OUTPUT_FILE = ROOT / "data" / "i18n.js"
STATIC_FILE = ROOT / "tools" / "i18n-static.js"

LANGS = {
    "zh-CN": "zh-CN",
    "fr": "fr",
    "de": "de",
    "it": "it",
    "km": "km",
    "ko": "ko",
    "pt": "pt",
    "ru": "ru",
    "es": "es",
    "vi": "vi",
}

REPAIR_SAME_AS_SOURCE_CACHE = False

MANUAL_KEY_OVERRIDES = {
    "zh-CN": {
        "navHome": "首页",
        "navTransfers": "出租车路线",
        "navTours": "贡布旅游",
        "navVehicles": "车辆",
        "navBooking": "预订",
        "navContact": "联系",
        "bookWhatsApp": "WhatsApp 预订",
        "bookNow": "立即预订",
        "moreDetails": "更多详情",
        "from": "起价",
        "askForQuote": "询价",
        "sendWhatsApp": "通过 WhatsApp 发送",
    },
    "fr": {
        "navHome": "Accueil",
        "navTransfers": "Transferts taxi",
        "navTours": "Tours Kampot",
        "navVehicles": "Véhicules",
        "navBooking": "Réserver",
        "navContact": "Contact",
        "bookWhatsApp": "Réserver sur WhatsApp",
        "bookNow": "Réserver",
        "moreDetails": "Plus de détails",
        "from": "À partir de",
        "askForQuote": "Demander un prix",
        "sendWhatsApp": "Envoyer sur WhatsApp",
    },
    "de": {
        "navHome": "Start",
        "navTransfers": "Taxi-Transfers",
        "navTours": "Kampot-Touren",
        "navVehicles": "Fahrzeuge",
        "navBooking": "Buchung",
        "navContact": "Kontakt",
        "bookWhatsApp": "Per WhatsApp buchen",
        "bookNow": "Jetzt buchen",
        "moreDetails": "Mehr Details",
        "from": "Ab",
        "askForQuote": "Preis anfragen",
        "sendWhatsApp": "Per WhatsApp senden",
    },
    "it": {
        "navHome": "Home",
        "navTransfers": "Transfer taxi",
        "navTours": "Tour Kampot",
        "navVehicles": "Veicoli",
        "navBooking": "Prenota",
        "navContact": "Contatto",
        "bookWhatsApp": "Prenota su WhatsApp",
        "bookNow": "Prenota",
        "moreDetails": "Dettagli",
        "from": "Da",
        "askForQuote": "Chiedi preventivo",
        "sendWhatsApp": "Invia su WhatsApp",
    },
    "km": {
        "navHome": "ទំព័រដើម",
        "navTransfers": "សេវាតាក់ស៊ី",
        "navTours": "ដំណើរកម្សាន្តកំពត",
        "navVehicles": "រថយន្ត",
        "navBooking": "កក់ឡាន",
        "navContact": "ទាក់ទង",
        "bookWhatsApp": "កក់តាម WhatsApp",
        "bookNow": "កក់ឥឡូវ",
        "moreDetails": "ព័ត៌មានលម្អិត",
        "from": "ចាប់ពី",
        "askForQuote": "សួរតម្លៃ",
        "sendWhatsApp": "ផ្ញើតាម WhatsApp",
    },
    "ko": {
        "navHome": "홈",
        "navTransfers": "택시 이동",
        "navTours": "캄폿 투어",
        "navVehicles": "차량",
        "navBooking": "예약",
        "navContact": "연락처",
        "bookWhatsApp": "WhatsApp 예약",
        "bookNow": "예약하기",
        "moreDetails": "자세히",
        "from": "부터",
        "askForQuote": "견적 요청",
        "sendWhatsApp": "WhatsApp으로 보내기",
    },
    "pt": {
        "navHome": "Início",
        "navTransfers": "Táxi privado",
        "navTours": "Passeios Kampot",
        "navVehicles": "Veículos",
        "navBooking": "Reserva",
        "navContact": "Contato",
        "bookWhatsApp": "Reservar no WhatsApp",
        "bookNow": "Reservar",
        "moreDetails": "Mais detalhes",
        "from": "Desde",
        "askForQuote": "Pedir preço",
        "sendWhatsApp": "Enviar no WhatsApp",
    },
    "ru": {
        "navHome": "Главная",
        "navTransfers": "Такси",
        "navTours": "Туры Кампот",
        "navVehicles": "Авто",
        "navBooking": "Бронирование",
        "navContact": "Контакт",
        "bookWhatsApp": "Написать в WhatsApp",
        "bookNow": "Забронировать",
        "moreDetails": "Подробнее",
        "from": "От",
        "askForQuote": "Запросить цену",
        "sendWhatsApp": "Отправить в WhatsApp",
    },
    "es": {
        "navHome": "Inicio",
        "navTransfers": "Traslados taxi",
        "navTours": "Tours Kampot",
        "navVehicles": "Vehículos",
        "navBooking": "Reserva",
        "navContact": "Contacto",
        "bookWhatsApp": "Reservar por WhatsApp",
        "bookNow": "Reservar",
        "moreDetails": "Más detalles",
        "from": "Desde",
        "askForQuote": "Pedir precio",
        "sendWhatsApp": "Enviar por WhatsApp",
    },
    "vi": {
        "navHome": "Trang chủ",
        "navTransfers": "Taxi tuyến",
        "navTours": "Tour Kampot",
        "navVehicles": "Xe",
        "navBooking": "Đặt xe",
        "navContact": "Liên hệ",
        "bookWhatsApp": "Đặt qua WhatsApp",
        "bookNow": "Đặt ngay",
        "moreDetails": "Chi tiết",
        "from": "Từ",
        "askForQuote": "Hỏi giá",
        "sendWhatsApp": "Gửi qua WhatsApp",
    },
}

MANUAL_TEXT_OVERRIDES = {
    "km": {
        "Kampot Taxi by Tha SUV and Van Options": "ជម្រើស SUV និង Van របស់ Kampot Taxi by Tha",
        "Phnom Penh travel scene for Kampot Taxi by Tha": "ទេសភាពធ្វើដំណើរភ្នំពេញសម្រាប់ Kampot Taxi by Tha",
        "Round Trip Tour": "ដំណើរកម្សាន្តទៅ-មក",
        "Route / trip": "ផ្លូវ / ដំណើរ",
        "Route or trip": "ផ្លូវ ឬ ដំណើរ",
        "Van from": "តម្លៃ Van ចាប់ពី",
        "Varies": "ប្រែប្រួល",
        "Vehicle": "រថយន្ត",
        "Vehicle capacity": "ចំនួនអ្នកដំណើរក្នុងរថយន្ត",
        "Vehicles": "រថយន្ត",
        "View Kampot tours →": "មើលដំណើរកម្សាន្តកំពត →",
    },
    "ko": {
        "Contact": "연락처",
        "FAQ": "자주 묻는 질문",
    },
}

EXTRA_STRINGS = [
    "Copied Telegram number.",
    "Please add route, pickup location, destination, and travel date.",
]

PRESERVE_EXACT = {
    "Kampot Taxi by Tha",
    "WhatsApp",
    "Telegram",
    "SUV",
    "Van",
    "ABA",
    "English",
    "Chinese",
    "French",
    "German",
    "Italian",
    "Khmer (Cambodian)",
    "Korean",
    "Portuguese",
    "Russian",
    "Spanish",
    "Vietnamese",
}


def normalize(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def should_skip_tag(tag):
    if not getattr(tag, "name", None):
        return False
    if tag.name in {"script", "style", "noscript", "template"}:
        return True
    if tag.find_parent(["script", "style", "noscript", "template"]):
        return True
    if "language-select" in tag.get("class", []):
        return True
    if tag.find_parent(class_="language-select"):
        return True
    return False


def should_translate_meta(tag):
    marker = (tag.get("name") or tag.get("property") or "").lower()
    return any(
        token in marker
        for token in ("title", "description", "site_name", "image:alt")
    )


def add_string(strings, value):
    text = normalize(value)
    if text:
        strings[text] = None


def collect_strings():
    strings = {}
    keyed = {}
    html_files = sorted(
        p
        for p in ROOT.rglob("*.html")
        if ".git" not in p.parts and "node_modules" not in p.parts
    )
    for html_file in html_files:
        soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "html.parser")
        for text_node in soup.find_all(string=True):
            if not isinstance(text_node, NavigableString):
                continue
            parent = text_node.parent
            if should_skip_tag(parent):
                continue
            if parent and parent.find_parent(attrs={"data-i18n": True}):
                continue
            add_string(strings, text_node)

        for tag in soup.select("[data-i18n]"):
            key = tag.get("data-i18n")
            value = normalize(tag.get_text(" ", strip=True))
            if key and value and key not in keyed:
                keyed[key] = value
            add_string(strings, value)

        for tag in soup.find_all(True):
            if should_skip_tag(tag):
                continue
            for attr in ("placeholder", "aria-label", "title", "alt"):
                if tag.has_attr(attr):
                    add_string(strings, tag[attr])
            if tag.name == "meta" and should_translate_meta(tag) and tag.has_attr("content"):
                add_string(strings, tag["content"])

    for value in EXTRA_STRINGS:
        add_string(strings, value)
    return sorted(strings), keyed


def load_cache():
    if CACHE_FILE.exists():
        return json.loads(CACHE_FILE.read_text(encoding="utf-8"))
    return {}


def save_cache(cache):
    CACHE_FILE.write_text(
        json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )


def translate_one(translator, source):
    if source in PRESERVE_EXACT:
        return source
    return translate_texts(translator, [source])[0]


def translate_texts(target, sources):
    separator = " <xsplit> "
    query = separator.join(sources)
    for attempt in range(3):
        try:
            response = requests.get(
                "https://translate.googleapis.com/translate_a/single",
                params={
                    "client": "gtx",
                    "sl": "en",
                    "tl": target,
                    "dt": "t",
                    "q": query,
                },
                timeout=20,
            )
            response.raise_for_status()
            payload = response.json()
            translated = "".join(part[0] for part in payload[0] if part and part[0])
            parts = [normalize(part) for part in translated.split(separator)]
            if len(parts) != len(sources):
                raise ValueError("Translation split count mismatch")
            return [part or source for part, source in zip(parts, sources)]
        except Exception:
            if attempt == 2:
                if len(sources) > 1:
                    return [translate_texts(target, [source])[0] for source in sources]
                return list(sources)
            time.sleep(1.2 * (attempt + 1))
    return list(sources)


def translate_chunk(target, sources):
    outbound = []
    positions = []
    results = [source for source in sources]
    for index, source in enumerate(sources):
        if source in PRESERVE_EXACT:
            continue
        outbound.append(source)
        positions.append(index)
    if not outbound:
        return results
    translated = translate_texts(target, outbound)
    for position, value in zip(positions, translated):
        results[position] = normalize(value) or sources[position]
    return results


def should_retry_cache(source, value):
    if not REPAIR_SAME_AS_SOURCE_CACHE:
        return False
    if value != source:
        return False
    if source in PRESERVE_EXACT:
        return False
    if source.lower() == "html":
        return False
    return not re.fullmatch(r"[$\d\s:+./(),\-–→×✈]+", source)


def translate_all(strings):
    cache = load_cache()
    output = {"en": {source: source for source in strings}}
    for lang, target in LANGS.items():
        lang_cache = cache.setdefault(lang, {})
        lang_output = {}
        missing = [
            source
            for source in strings
            if source not in lang_cache or should_retry_cache(source, lang_cache[source])
        ]
        print(f"{lang}: {len(missing)} new strings, {len(strings)} total", flush=True)
        chunk_size = 36
        for start in range(0, len(missing), chunk_size):
            chunk = missing[start : start + chunk_size]
            translated = translate_chunk(target, chunk)
            for source, value in zip(chunk, translated):
                lang_cache[source] = value
            save_cache(cache)
            print(
                f"  {lang}: cached {min(start + chunk_size, len(missing))}/{len(missing)}",
                flush=True,
            )
            time.sleep(0.2)
        for source in strings:
            lang_output[source] = lang_cache.get(source, source)
        output[lang] = lang_output
        save_cache(cache)
    return output


def build_keyed_i18n(keyed, text_i18n):
    keyed_i18n = {"en": dict(sorted(keyed.items()))}
    for lang in LANGS:
        translated = {}
        for key, source in keyed.items():
            translated[key] = text_i18n[lang].get(source, source)
        translated.update(MANUAL_KEY_OVERRIDES.get(lang, {}))
        keyed_i18n[lang] = dict(sorted(translated.items()))
    return keyed_i18n


def main():
    strings, keyed = collect_strings()
    print(f"Collected {len(strings)} unique translatable strings.", flush=True)
    text_i18n = translate_all(strings)
    for lang, overrides in MANUAL_TEXT_OVERRIDES.items():
        text_i18n.setdefault(lang, {}).update(overrides)
    keyed_i18n = build_keyed_i18n(keyed, text_i18n)
    js = (
        "window.KT_I18N = "
        + json.dumps(keyed_i18n, ensure_ascii=False, indent=2, sort_keys=True)
        + ";\nwindow.KT_TEXT_I18N = "
        + json.dumps(text_i18n, ensure_ascii=False, indent=2, sort_keys=True)
        + ";\n"
    )
    OUTPUT_FILE.write_text(js, encoding="utf-8")
    STATIC_FILE.write_text(js, encoding="utf-8")
    print(f"Wrote {OUTPUT_FILE.relative_to(ROOT)} and {STATIC_FILE.relative_to(ROOT)}.")


if __name__ == "__main__":
    main()
