---
layout: team
title: team
permalink: /team/
description: Current and former members.
nav: true
nav_order: 5
---

<div class="people">

{% assign groups = "faculty|graduate|undergraduate|alumni" | split: "|" %}
{% for group in groups %}
<h3 class="mt-2 mb-3">{{ group }}</h3>
  
<div class="group-members">

  {% assign sorted_members = site.team | where_exp:"item", "item.group == group" %} 
  {% for member in sorted_members %}
  
  <div class="grid-item">

    {% if member.redirect %}
    <a href="{{ member.redirect }}" target="_blank">
    {% else %}
    <a href="{{ member.website | relative_url }}">
    {% endif %}
    
      <div class="card hoverable">
        {% if member.img %}
        <img src="{{ member.img | relative_url }}" alt="member thumbnail">            
        {% endif %}
               
         <div class="member-name">
              <a href="{{ member.website }}"><b>{{ member.name }}</b></a>
         </div>
         <div class="member-description">
              <p>{{ member.description }}</p>
         </div>
          
      </div>
    </a>
  </div>

{% endfor %}

</div>

{% endfor %}

</div>

  
