!function(e,t){"use strict";var a={init:function(){t.hooks.addAction("frontend/element_ready/section",a.elementorSection)},elementorSection:function(e){var a=e,n=null;Boolean(t.isEditMode());(n=new i(a)).init(n)}};e(window).on("elementor/frontend/init",a.init);var i=function(a){var i=this,n=a.data("id"),r=Boolean(t.isEditMode()),l=e(window);e("body"),l.scrollTop(),l.height(),navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),navigator.platform;i.init=function(){return!(e(window).width()<=1024)&&(i.setParallaxMulti(n),i.moveBg(n),!1)},i.setParallaxMulti=function(t){var n,l={},o=[];if(l=i.getOptions(t,"ekit_section_parallax_multi_items"),"yes"==(n=i.getOptions(t,"ekit_section_parallax_multi"))){if(r){if(!l.hasOwnProperty("models")||0===Object.keys(l.models).length||"yes"!=n)return;l=l.models}if(a.addClass("elementskit-parallax-multi-container"),e.each(l,function(e,t){t.hasOwnProperty("attributes")&&(t=t.attributes),o.push(t),i.pushElement(t),i.getSVG()}),o.length<0)return o;a.on("mousemove",function(t){e.each(o,function(e,a){"mousemove"==a.parallax_style&&i.moveItem(a,t)})}),e.each(o,function(e,t){"tilt"==t.parallax_style&&i.tiltItem(t),"onscroll"==t.parallax_style&&i.walkItem(t)})}},i.moveBg=function(e){var t,n;t=i.getOptions(e,"ekit_section_parallax_bg"),n=i.getOptions(e,"ekit_section_parallax_bg_speed"),a.addClass("elementskit-parallax-multi-container"),"yes"!=t||r||a.jarallax({speed:n})},i.walkItem=function(e){void 0!==e.parallax_transform&&void 0!==e.parallax_transform_value&&a.find(".elementor-repeater-item-"+e._id).magician({type:"scroll",offsetTop:parseInt(e.offsettop),offsetBottom:parseInt(e.offsetbottom),duration:parseInt(e.smoothness),animation:{[e.parallax_transform]:e.parallax_transform_value}})},i.moveItem=function(e,t){var i=t.pageX-a.offset().left,n=t.pageY-a.offset().top,r=a.find(".elementor-repeater-item-"+e._id);TweenMax.to(r,1,{x:(i-a.width()/2)/a.width()*e.parallax_speed,y:(n-a.height()/2)/a.height()*e.parallax_speed,ease:Power2.ease})},i.tiltItem=function(e){var t=a.find(".elementor-repeater-item-"+e._id);t.find("img");t.tilt({disableAxis:e.disableaxis,scale:e.scale,speed:e.parallax_speed,maxTilt:e.maxtilt,glare:!0,maxGlare:.5})},i.getOptions=function(t,a){var i=null,n={};if(r){if(!window.elementor.hasOwnProperty("elements"))return!1;if(!(i=window.elementor.elements).models)return!1;if(e.each(i.models,function(e,a){t==a.id&&(n=a.attributes.settings.attributes)}),!n.hasOwnProperty(a))return!1}else{if(void 0===(n=e(t=".elementor-element-"+t).data("settings")))return;if(!n.hasOwnProperty(a))return!1}return n[a]},i.pushElement=function(e){var t="ekit-section-parallax-mousemove ekit-section-parallax-layer elementor-repeater-item-"+e._id,i="";"shape"==e.item_source&&(e.image={},e.image.url=window.elementskit_module_parallax_url+"assets/svg/"+e.shape+".svg",t+=" ekit-section-parallax-layer-shape",i="shape-"+e.shape.replace(".svg","")),0===a.find(".elementor-repeater-item-"+e._id).length&&""!=e.image.url&&a.prepend(`\n                        <div class="${t} ekit-section-parallax-type-${e.parallax_style}" >\n                            <img class="elementskit-parallax-graphic ${i}" src="${e.image.url}"/>\n                        </div>\n                    `)},i.getSVG=function(){a.find(".ekit-section-parallax-layer-shape img").each(function(){var t=e(this),a=t.prop("attributes"),i=t.attr("src");e.get(i,function(i){var n=e(i).find("svg");n=n.removeAttr("xmlns:a"),e.each(a,function(){n.attr(this.name,this.value)}),t.replaceWith(n)})})}}}(jQuery,window.elementorFrontend);
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */