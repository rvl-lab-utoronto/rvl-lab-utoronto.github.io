---
layout: team
title: team
permalink: /team/
description: Current and former members.
nav: true
---

{% assign groups = "faculty|graduate|undergraduate|alumni" | split: "|" %}
{% for group in groups %}
<h3 class="mt-2 mb-3">{{ group }}</h3>
  
<div class="team grid">

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
        <img class="float-left img-fluid rounded pic mb-2" src="{{ member.img | relative_url }}" alt="member thumbnail">                      
        {% endif %}
        <div class="card-body">
            
          <span>
              <a href="{{ member.website }}"><b>{{ member.name }}</b></a>
          </span>
         <div class="research d-none d-md-block">
              <p>{{ member.description }}</p>
         </div>
         
       
          <div class="row ml-1 mr-1 p-0">
            {% if member.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ member.github }}" target="_blank"><i class="fab fa-github gh-icon"></i></a>
              </div>
              {% if member.github_stars %}
              <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                <i class="fas fa-star"></i>
                <span id="{{ member.github_stars }}-stars"></span>
              </span>
              {% endif %}
            </div>
            {% endif %}
         </div>
                
        </div>
      </div>
    </a>
  </div>
{% endfor %}

</div>

{% endfor %}
