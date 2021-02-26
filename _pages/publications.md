---
layout: page
permalink: /publications/
title: publications
description: publications by categories in reversed chronological order
years: [2021, 2020, 2019, 2018, 2017, 2016, 2014, 2013, 2012, 2011]
nav: true
nav_order: 3
---

<header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
