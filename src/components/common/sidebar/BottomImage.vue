<template>
  <transition
    name="sidebar-image"
    @enter="onShowing"
  >
    <div
      class="absolute-bottom no-pointer-events"
      v-if="show"
    >
      <div
        class="simg-images"
        ref="simgs"
      >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="auto" viewBox="0 0 222 260">
  <defs>
    <filter id="Path_11631" x="80.042" y="204.749" width="150.968" height="32.486" filterUnits="userSpaceOnUse">
      <feOffset dy="3" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
    <pattern id="pattern" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 84.379, 0)" viewBox="0 0 42.189 77.347">
      <image preserveAspectRatio="none" width="42.189" height="77.347" xlink:href="data:image/png;base64,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"/>
    </pattern>
    <pattern id="pattern-2" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 121.455, 0)" viewBox="0 0 60.727 64.563">
      <image preserveAspectRatio="none" width="60.727" height="64.563" xlink:href="data:image/png;base64,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"/>
    </pattern>
    <pattern id="pattern-3" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 120.176, 0)" viewBox="0 0 60.088 35.797">
      <image preserveAspectRatio="none" width="60.088" height="35.797" xlink:href="data:image/png;base64,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"/>
    </pattern>
    <pattern id="pattern-4" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 77.987, 0)" viewBox="0 0 38.993 28.126">
      <image preserveAspectRatio="none" width="38.993" height="28.126" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAsCAYAAADW6LDXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVXSURBVGhD3VhNiBxVEH492fwYE4hhgyFh1USCGlEEoyL+4Z4VDx486MGLBxHBiASEICISQSWseFBQRNRADgoRI0HBRUHBH1BEBQ8qIoluUJfEbJZ17X7P+qrqvX7dO7M729M9M5tveKl639Srqq+7MulO4pwzdeHn425jZk2SZSa5YkdyWumhQ0ttLcD105V895O7QOmhQ22ifznhNmBmIBjW0h9f/+g285dDhlpE//oHCYZYWcZZFU/ryx/cqIYNDXoW/duUO9/ISIfRJiPidX32rdui4UOBnn/IIDqlHy79AWvB8r4DN35dMqVHB4ae7vTxk249/d31Yy13Nxptz1nhmP/gc7tNjw8MlUX//qcIXmq08YNG0AsA0pj3P7XbmR0QKome+tudJ1pEFHwW5fcRRyaJOVwossm7n9gx2g4ElUSzABpZFpCvJUcb8TwZyr3zkb1YU/YVyxZ9ctqtKwjIV1ejDQ40c2QPf2gv4ag+Ylmi/zplWDCaBcoCeB9xZNqONsd7nvy3jtmd9HXf0LXo6dNmbRjVGkbbc+wT9/p79lIt1Ti6Fs13DJ9YQL4qjbaP9dyrR+wuHGoaXYme/sesISMChFoggPcRR6ar0Q6c5njpbXsZuY1iSdGnZkgwNdXkaMMiHnXgv3jYXi7Vm8Gios+cNavRLO5A06ONeI5R7uChbDeZRrCoaBQvCGB3oYC42XYCyPcXJr44OZfnYA7xRJln38iuhK0bHUXPzJoRLk6rn6MNDvE+x4HXsqu4oRrRVvTsnBlBc1wcjeCjzYLj5mT5uxU4xBP0AoD0OUJ8iPUc4jlGOescc/gO/FOvZFfTvjZIYxHm5s0q/1qI10G64q00c/41UV4R27wytuccfOZ4r3EFLo8PZ62c899TfYnD/sBDq77RVitj4Z3WK653daCjzfHK+fh9L2TXos1eUBA9/59peWFcHMXwQXHltBnmyEizuhBP4PN1jTaA2uRKXtrvPZjtkW+qIYjGyHHyUJzpUAjg5sh6jvcRR6YkgOMkh+djLs/BHOKJCnkJzMHVsxJL6+Hnsus5ogJYNI1QPka0uDitMGZkuXi+/LgVuMJY0uJ8JY595bRm4BBfyKFcIYf3yT74THYDRSwbIpqSqGUBXByJ8UEh5bQwc2SkWV2ag883Odq8Iu6Bp7MbOXAZaOEg2fwu0EYLhkIAN0fWc7yPODIlARwnOTwfc3kO5hBPVMhLkJ7I0bMSW+IQf/+T6U18oku0ErqHYYwkyYoYbVjfK/z79qc304muwOO9ZrWx69aabMN6k3JxJMYHhSSxL8wcGWlWF+IJ4GiB9DlCfIj1HOI5Rrkqoy0x0ie4ex5PbwW3FAr/ZAGbNpr50U3m3ws3J3PbtiSz4MoC4ma1eElA3hhzsnIuz8Ec4okKeQnMwdWzElviohzso/jd+9LbyFsUC0SXcdHW5OzO7cnMrrHkDBeT0fKCWNSgRzvkkH1y16Pp7cR0BAVRdEV88b0blcdGfVTUx9XosbGLR1X4rkU5mMNSv+OjanSumE+/gw/xRydGJrXVAnoSHWPyK7e1iWftTlzKvstzBI7j8K8So53w2kSXceRjO0YNtEIj0oyK9JPhufBCw7y/6zGnvs+hk8F3OnBxjLbBKAtvTHSMQ8fsDm0o3Jm82WZGW0sX4MX3RXQZ+M8/32yTo90OED4Q0TGefzPbrYIaGe12GLjoMp54ObumJJLFF7nlj3aMoRMd47GJbE8sioWxX220PYZadBl4o+p1tIEVJTrGvfvTW6qMNrBiRZdx5950vFsp54zoGHc8ko6r2xbnpOgy4otwdGJk8n85TUvV2T/NxAAAAABJRU5ErkJggg=="/>
    </pattern>
    <pattern id="pattern-5" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 40.911, 0)" viewBox="0 0 20.456 27.487">
      <image preserveAspectRatio="none" width="20.456" height="27.487" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAArCAYAAAAZvYo3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR3SURBVFhHxVhNix1VEL23e5BIFNy4UEGNH1FCXAyIQiCImkUEBTeziSBENyIuIkJcJKus3Agu3Pgb3GYZshYREYKIi5CISBhI4iiTr5l+r61z6tyP7hmZycx7k4Ki+1bXrXPq3Hqv30zs+z7slV291j8ynYbw3FNxVaEwdwJ/Lvf7AWoep32IE7sefDr+q8ezJ7B8o38YIAQ1QABzbTCTiZM4dCD+o/TZELi+EvZNrHIGc0AnofsEjvUrL8S/tXVnBFZWw0O5OAH60mkFqhjWDeITxRZfijdVansEbt8NCygw7mQ6NWBI68AJkLHB2mO4Mv7qoXhDpUOj6wa7txbaO/dCe+tOWABoZ110XWisYNNN+ki3Yt0EazruCWj5DRxx7OV+d+YJgpYJmBBMWlsPzV0Dror75k5XAxaAF7a47kuu+Xq5b1CLuVoLksYFWOdkFUoAKmyAvXWPzkvuuikionSqgxjztV+KKMbaRJbxgTZlUMqNqz1bH8nN5/JabsalRtqb8oxo2WNxYdM4hLd8yPKQlGHz6WZcgwdQXXOsjtcDWOpwbXE7Pu1550jzFwiQzf59oUMi2FkhU2QktxSpzhWApXOsPcYaKad0ThWzylAKuLAsx2OPhjXfNJQ7udYDUOY7YAaFIwcx5qJrj3kj+iQJdngeYJmSuQGFjEx9hnTvPoG5S5GUY0Nreei8IlfVEeSQwJOPx9tJbjgkTYxRPIHp+QCwOKQucsux9hqu7uYEYM8+EVdzYYDjWtw/dqOpFkFbj+RWTp6d6mgFt5EA7EV7XSJRm7iBPlKEz+m9gbDrHNMexnDV2snZWlCbE4Adfj6uKJkbcB3PAgvjnC1eAZBgnUcfxQTz/wRgiy/Hm6mwbfJOsiIG7OA4lo2ATnrQOfYrtrUCyV4/HK+rmAobqIYMneOaitM1I4o5EQ1e/T2i8lsTgB1djMtevBqyAljIGZDeDzkGQsjL+YiZq/T2CMDefi1eQxEUrTuBp8J154jlnOHsGMH+/gnA8P2NAgJ0uevCLD6KSZFMTHOjkjv7Sfb9hekzo5dTfonxOor7C4gvtvLryWJnPmov3ZcCyZaONX+gm0ryIrd5dUSUG58Y5tsauUaCiqDWjgjAThxvrtRyq2gatiy3Yk5GuWmNOjsmADv5XnMZAABj0TxsfB8kIDjBmYsj8fvdKZCMAPjYcdiK3JspIsVIBseE/bsm8OlS8ztnYSg3vfrqTgo4ESe1+yNIdupE85uASALdQ5Fabqok8JSLvTMhADv9YftrKsxZqOSGkwSOye95LNg3MwKwsx+3lxJo6pxglSKJEBTBnpkSgJ37pP2lkpvOWZAiFbHZK5Dsq8/an9m5qzEAxRpk8OMXuXMhAPv68/an6qdYmQX7tPjP/jkdQW3fnm5/rLo3EgB3RUAGOXMlAPvuTPsDgP1PPClh3YMEns/kPyTbsQ/OdkeHb0f3PSMAW/qye8New07iQRCAvf9F9ybAE+yeE4C9e6p7S7fzH8Kt7IEQOP/NwkW/C+E/P7Ot5rGAMkUAAAAASUVORK5CYII="/>
    </pattern>
    <pattern id="pattern-6" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 34.519, 0)" viewBox="0 0 17.259 28.766">
      <image preserveAspectRatio="none" width="17.259" height="28.766" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAtCAYAAABf9xDlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO0SURBVFhHtVY9aBRBFJ6ZPULUYIoUIgQERQtFEBTRRjGNRbBRrASxCXYKCsZKLBQhhT9FGhutbBQEsQyKiEVQLESiWGgMkkSJ4TAaldzeOO9v9v921yQfPHbnzZv3zfvbO22tVVWx+Ec11narFi9rw/CzFM2fqisMlf71WzVYVRuVyYCoxcKq2qhM1gqtDtvKOFLTXFBdrK6FOpEZIJTo5n/UJ6zUIJMztsdoZY1RNnDi3pUxGtd9veovm5WiUmRQLxEXlWm14QlRWj3XVN1sVopKZJg6JMCaeWInmNpv89UIq0aGjeEaBOvF5I6I3sO21V+/2zVsXojqkcWEyX2EToepZfNClDbIqwnbB43gRGFzUIPQk94T+v4NepGPZlAaGUdDKWuxSFpBUqmdmrXr+GgGpWQ8yJQubhJwvARrIsc1k6Pd55l8wqqRoaBDRyhOY01igHyJowaZnLY97MKjY83GxtsbeXhVqk6kc+9BpMd1up5b+vUCu+scGd3aupvCACeiy00t75MN2SU6tDNZzCnMEjgQpzHnRalFeT9p17O7zmR4OBI3S0CIpP4XILZPNrAXCWbh3SfbC/4Ka3Z/rL0J8u5mqLBeRtPHGG2iPbEjHezLGfadgdwsdXNMk795jdRu36ybhWTukHfCB6norGOplNpd2/Q8+OxE5o3d/OAciU6cIoHX53ft3h16jl3m1+z2w/ZWyH9OLRJr/010+ti8QS3R7tAePcsuEbmRya3kljJLEgkL7Bv8XNGXQwRTmyYC5JLJQXGKQoQksYuA3hODOOLD+8w0u0qgKDIkSg8oCJPLRUDHfxNIjhwwX9hNBgWRQaGh4JFTJ6WpPTZgpthFLjINcu1OuJOKnC04iB9Qv0fPk4PmI7soRCYyf3MWiojnCHQ5qa1CBMiQiVNIGRBFTotTy0dLkTF0wwsOE7cXp0TgSF2kYnP6qPnAR0uRqNmFW+HuVC2wNvE/NLxG/bkTwQQfrYREZPFooDaSLlzTfw2f2rpEgASZDChLRAwEtIfri6eCt3ykFtKRJQZUmgRIhOjSUPCGzWvD12zoSrg/VRuaJa4TyMiZ4DUa/yd8ZDBLElF8liS1yyUCeDJyTr+8kjZOnblxPnjJZstCFBmQYEQ4vP7bNzocjLPJsoE1Oz7cOih1iX/77l5uvGC7FQFG5usDT67XShMBPBmkEdLmhlffu9p4jrsrDCRzmcTIQB6MNJ7hzirANwjg0fXGU35dFejBs0sD8PL4ZuMJalYNSv0DwzC1G34UoEYAAAAASUVORK5CYII="/>
    </pattern>
    <pattern id="pattern-7" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 40.911, 0)" viewBox="0 0 20.455 66.48">
      <image preserveAspectRatio="none" width="20.455" height="66.48" xlink:href="data:image/png;base64,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"/>
    </pattern>
    <pattern id="pattern-8" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 23.012, 0)" viewBox="0 0 11.506 21.734">
      <image preserveAspectRatio="none" width="11.506" height="21.734" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAiCAYAAABStIn6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH+SURBVEhLrZQvT8RAEMV32+4JDAqDwKAwKAyCELAgMAg+ABoSSEiQhA9waAwOSwIGQ3DgEUgcBk0QtF3mzewu7XH9s3e8ZLKd3nX2N2+21dZatX2Yb6qeuhtmD+6yJr118N27iNe4YknTDm0a10Hi1mih2M5RvuFSKRRLpbVSWarKLFPl3mm+xvdgtlcf06mINZmyXCillYqZVNuo1tJE2YGhB+nhAYKvNec1IqiJyrVijVupKIoIGeWdRGgFO3OgDRRjGiHx9/8QQZ4KrcAD9kKCdqcC4dqtlDcS4Q9G/GACigIUTIX78psEXY8lgnZP8nXQ8O60ZqkeIav+1kIUPDG6GMhknDe/vlSpGomg/fNiNXUEld3ZG0wv/EZ569SYwAXtTmRCgyJ4OORE3EoEHQ+LFaaQAJWfFCYYyDrPEZsqYZ0nND2QyDliMso7iaCzy2IZDwgFRUInupLDv04iSHxQhbxX1E6VDIX6EkEX1+WS352pxCdQMVkvIqiye+GnRhHOVW8i6Oq2XPTe1MjoXm8iyFN5Ml5BRq9PFBF081gugAJnBy3iLCGPLgTdP5Xz9BKH1kAV1ZoXjkEwn1ubkAh6frFz3misExFBGD0OIpsfO/5Rvb7ZWfaJPskTE0FMBY+mJYLeP+wMPsNTEUH+czI1EfT5pcimf5DJVPkDmfAuHneB1kcAAAAASUVORK5CYII="/>
    </pattern>
    <pattern id="pattern-9" width="1" height="1" patternTransform="matrix(-1, 0, 0, 1, 21.734, 0)" viewBox="0 0 10.867 15.981">
      <image preserveAspectRatio="none" width="10.867" height="15.981" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAZCAYAAADXPsWXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGzSURBVDhPpVSxSgNBEN075O7qFIKFIAiiRUBEEARBrC1sLW2thBSC2NiIXURErAQbwWAl6RTBwsZCsPNjbnedNzu7bjSXS86BIXNv5715O3cksdaq/8THl22lUjeKt087baxKGos8v5sZY5TCRRqLyBZoHQ2dPL6aWVyDspmT+yczxyZEYGInt30zb90e4IKvMpGT6wezwPbdHrwLBWwske6dXoon+13Ic/11Tm90m5upFgEvRmkZqxXBVPkemOgXyrhgI0WOr/Qy/SRILFSILEhi7A7PlSKdrl5FM1wwEaBMDmJ0RjHcyf6ZXoNlEEESYvi45EoOJ6E/Insn5ToaPVGEKHmJQZAxRxkU2T0qN+TQTXULDWRP9JhzZ3+us9MpN2UCLxEhBCcoyW8Ki8aZDGGR7YNyC804xaGbEE2XjIcwJkOCE0zzTXjmJqojscohKVyARMEApkDQNzCREpgnopl7qQaW9s+nXgLoONRoWUCI3ExHlUNAgMZA4DUXWaLzTJkiUxpJtS5y1Inh2mOUQ0XiOLzQK0GMRHISj4QZrxX5HZc9sxiJjOdkVPTor7LIlP4G+jKQkZikI7kAAAAASUVORK5CYII="/>
    </pattern>
    <linearGradient id="linear-gradient" x1="0.574" y1="1" x2="0.544" y2="0.163" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#f1efef"/>
      <stop offset="1" stop-color="#efefef"/>
    </linearGradient>
    <clipPath id="clip-Artboard_3">
      <rect width="222" height="260"/>
    </clipPath>
  </defs>
  <g id="Artboard_3" data-name="Artboard – 3" clip-path="url(#clip-Artboard_3)">
    <g id="bg" transform="translate(-6.687 5.516)" opacity="0.1">
      <g id="Group_2805" data-name="Group 2805" transform="translate(0 10)">
        <g data-name="Group 28153" transform="translate(3.265 71.938)">

          <g id="Group_4395" data-name="Group 4395" transform="translate(3.393 -87.938)">
            <rect id="Rectangle_18" data-name="Rectangle 18" width="42.189" height="77.347" transform="translate(21.095 47.303)" fill="url(#pattern)"/>
            <rect id="Rectangle_19" data-name="Rectangle 19" width="60.727" height="64.563" transform="translate(28.766 40.911)" fill="url(#pattern-2)"/>
            <rect id="Rectangle_20" data-name="Rectangle 20" width="60.088" height="35.797" transform="translate(29.405 33.24)" fill="url(#pattern-3)"/>
            <rect id="Rectangle_21" data-name="Rectangle 21" width="38.993" height="28.126" transform="translate(28.766 5.753)" fill="url(#pattern-4)"/>
            <rect id="Rectangle_22" data-name="Rectangle 22" width="20.456" height="27.487" transform="translate(21.734 1.278)" fill="url(#pattern-5)"/>
            <rect id="Rectangle_23" data-name="Rectangle 23" width="17.259" height="28.766" transform="translate(0.639)" fill="url(#pattern-6)"/>
            <rect id="Rectangle_24" data-name="Rectangle 24" width="20.455" height="66.48" transform="translate(0 47.943)" opacity="0.74" fill="url(#pattern-7)"/>
            <rect id="Rectangle_25" data-name="Rectangle 25" width="11.506" height="21.734" transform="translate(0 38.993)" fill="url(#pattern-8)"/>
            <rect id="Rectangle_26" data-name="Rectangle 26" width="10.867" height="15.981" transform="translate(0 19.816)" fill="url(#pattern-9)"/>
            <path id="Path_84" data-name="Path 84" d="M1532.592,364.565a15.875,15.875,0,1,0,15.875-15.875A15.875,15.875,0,0,0,1532.592,364.565Z" transform="translate(-1528.022 -325.537)" fill="#f6f9ff"/>
          </g>
        </g>
        <g id="apartment" data-name="Group 2814" transform="translate(3.265 71.938)">
          <g id="Group_2811" data-name="Group 2811" transform="translate(20.959 89.487)">
            <path id="Exclusion_1" data-name="Exclusion 1" d="M-3643.784,1272.873h-17.55V1240.3h-3.162v32.574h-28.752V1260.49h-.295v12.382H-3708.4v-45.149h14.853v-11.693l16.1-10.295,16.1,10.295V1240.3h17.55v32.574Zm-49.759-22.016h-3.279v9.633h3.279v-9.633Zm-12.25,0v9.633h3.6v-9.633Zm12.544,0v9.633h.029v-9.633Zm-.295-8.677v8.677h.295v-8.676h-.295Zm19.075-1.765v9.633h3.6v-9.633Zm-8.971,0v9.633h3.6v-9.633Zm-10.1-7.868h-3.279v9.633h3.279v-9.633Zm-12.25,0v9.633h3.6v-9.633Zm12.544,0v9.633h.029v-9.633Zm-.295-4.824v4.824h.295v-4.824Zm19.075-5.692v9.633h3.6v-9.633Zm-8.971,0v9.633h3.6v-9.633Zm-56.5,50.841v-57.5h-.206v57.5h-100.388v-67.431l22.061-9.927v45.738h17.354v-28.09h20.516v40.089h8.529v-26.486h7.574v-32.709l24.561,13.089v8.223h26.046v57.5h-26.046Zm-10.516-10.152v9.634h3.6v-9.634Zm-8.971,0v9.634h3.6v-9.634Zm7.972-13.923v9.634h3.6V1248.8Zm-8.971,0v9.634h3.6V1248.8Zm36.017-7.059v9.633h3.6v-9.633Zm-8.97,0v9.633h3.6v-9.633Zm-55.063-4.927v9.634h3.6v-9.634Zm-8.97,0v9.634h3.6v-9.634Zm45.958-6.4v9.634h3.6v-9.634Zm-8.971,0v9.634h3.6v-9.634Zm-66.916-1.912v9.633h3.6V1228.5Zm-8.97,0v9.633h3.6V1228.5Zm111.9-5.074v9.634h3.6v-9.634Zm-8.97,0v9.634h3.6v-9.634Zm-55.063-5v9.634h3.6v-9.634Zm-8.97,0v9.634h3.6v-9.634Zm45.958-6.324v9.633h3.6V1212.1Zm-8.971,0v9.633h3.6V1212.1Zm-66.916-1.912v9.634h3.6v-9.634Zm-8.97,0v9.634h3.6v-9.634Z" transform="translate(3840.537 -1231.175)" fill="#fff"/>
            <g id="Group_2810" data-name="Group 2810" transform="translate(-20.959 -89.487)">
              <path id="Path_14105" data-name="Path 14105" d="M0,0H21.766V50.768H0Z" transform="translate(184.263 80.079)" fill="#fff" opacity="0.89"/>
              <path id="Path_14103" data-name="Path 14103" d="M0,0H11.986V40.694H0Z" transform="translate(86.625 90.153)" fill="#fff" opacity="0.89"/>
              <path id="Path_14104" data-name="Path 14104" d="M0,0H15.148V64.372H0Z" transform="translate(73.389 66.548)" fill="#fff" opacity="0.89"/>
            </g>
          </g>
          <g id="Group_4394" data-name="Group 4394">
            <path id="Path_11629" data-name="Path 11629" d="M249.053,345.518a277.767,277.767,0,0,1-48.485,6.407c-36.5,1.774-86.06,0-116.775,0-54.266,0-49.052-6.056-49.052-6.056-.921,0,.034-6.007,0-9.318l214.312-.35c.921,0,1.688,2.118,1.688,4.659h0C250.741,343.542,249.974,345.518,249.053,345.518Z" transform="translate(-31.337 -201.513)" fill="#fff"/>
            <path id="Path_11630" data-name="Path 11630" d="M189.383,331.086c-9.78,0-135.769-.319-148.491-.319.037-1.875.078-.951.094-2.75,13.4-5.358,37.582-11.417,70.818-11.417C151.513,316.6,179.236,324.174,189.383,331.086Z" transform="translate(-37.565 -192.268)" fill="#efefef"/>
            <g transform="matrix(1, 0, 0, 1, 3.42, -87.45)" filter="url(#Path_11631)">
              <path id="Path_11631-2" data-name="Path 11631" d="M377.867,331.062c-40.648,0-123.108.024-132.968.024,11.618-6.03,37.8-14.486,77.5-14.486,22.316,0,41.408,2.273,55.463,5.669Z" transform="translate(-155.86 -105.85)" fill="#efefef"/>
            </g>
            <path id="Path_11632" data-name="Path 11632" d="M333.655,336.23H200.5c9.944-5.171,32.419-12.43,66.528-12.43C301.236,323.8,325,330.264,333.655,336.23Z" transform="translate(-126.012 -192.038)" fill="#f8f8f8"/>
          </g>
        </g>

        <g id="left-cloude" transform="translate(0 31.638)">
          <g id="surface1" transform="translate(69.628 6.027)">
            <path id="Path_11698" data-name="Path 11698" d="M100,99.009A9.009,9.009,0,1,0,109.009,90,9.009,9.009,0,0,0,100,99.009Z" transform="translate(-81.982 -90)" fill="#fff"/>
            <path id="Path_11699" data-name="Path 11699" d="M120,257.419A7.419,7.419,0,1,0,127.419,250,7.419,7.419,0,0,0,120,257.419Z" transform="translate(-100.922 -233.042)" fill="#fff"/>
            <path id="Path_11700" data-name="Path 11700" d="M40,197.419A7.419,7.419,0,1,0,47.419,190,7.419,7.419,0,0,0,40,197.419Z" transform="translate(-12.444 -179.401)" fill="#fff"/>
            <path id="Path_11701" data-name="Path 11701" d="M320,196.359A6.359,6.359,0,1,0,326.359,190,6.359,6.359,0,0,0,320,196.359Z" transform="translate(-320 -179.401)" fill="#fff"/>
            <path id="Path_11702" data-name="Path 11702" d="M240,246.359A6.359,6.359,0,1,0,246.359,240,6.359,6.359,0,0,0,240,246.359Z" transform="translate(-231.521 -224.102)" fill="#fff"/>
            <path id="Path_11703" data-name="Path 11703" d="M240,126.889A6.889,6.889,0,1,0,246.889,120,6.889,6.889,0,0,0,240,126.889Z" transform="translate(-232.581 -116.82)" fill="#fff"/>
            <path id="Path_11704" data-name="Path 11704" d="M160,177.419A7.419,7.419,0,1,0,167.419,170,7.419,7.419,0,0,0,160,177.419Z" transform="translate(-145.162 -161.521)" fill="#fff"/>
          </g>
          <g id="surface1-2" data-name="surface1" transform="translate(-17.946 23.861)" opacity="0.41">
            <path id="Path_11698-2" data-name="Path 11698" d="M121.709,100.855A10.855,10.855,0,1,1,110.855,90,10.855,10.855,0,0,1,121.709,100.855Z" transform="translate(-92.338 -90)" fill="#fff"/>
            <path id="Path_11699-2" data-name="Path 11699" d="M137.878,258.939A8.939,8.939,0,1,1,128.939,250,8.939,8.939,0,0,1,137.878,258.939Z" transform="translate(-109.784 -229.568)" fill="#fff"/>
            <path id="Path_11700-2" data-name="Path 11700" d="M57.878,198.939A8.939,8.939,0,1,1,48.939,190,8.939,8.939,0,0,1,57.878,198.939Z" transform="translate(-40 -177.23)" fill="#fff"/>
            <path id="Path_11701-2" data-name="Path 11701" d="M335.324,197.662A7.662,7.662,0,1,1,327.662,190,7.662,7.662,0,0,1,335.324,197.662Z" transform="translate(-284.243 -177.23)" fill="#fff"/>
            <path id="Path_11702-2" data-name="Path 11702" d="M255.324,247.662A7.662,7.662,0,1,1,247.662,240,7.662,7.662,0,0,1,255.324,247.662Z" transform="translate(-214.46 -220.845)" fill="#fff"/>
            <path id="Path_11703-2" data-name="Path 11703" d="M256.6,128.3a8.3,8.3,0,1,1-8.3-8.3A8.3,8.3,0,0,1,256.6,128.3Z" transform="translate(-214.46 -116.169)" fill="#fff"/>
            <path id="Path_11704-2" data-name="Path 11704" d="M177.878,178.939A8.939,8.939,0,1,1,168.939,170,8.939,8.939,0,0,1,177.878,178.939Z" transform="translate(-144.676 -159.784)" fill="#fff"/>
          </g>
          <g id="Group_4393" data-name="Group 4393" transform="translate(68.05 47.139)">
            <path id="Path_11559" data-name="Path 11559" d="M176.635,160.318a1.618,1.618,0,1,1-1.618-1.618A1.632,1.632,0,0,1,176.635,160.318Z" transform="translate(-173.4 -155.317)" fill="#fff"/>
            <path id="Path_11560" data-name="Path 11560" d="M181.977,157.188a3.088,3.088,0,1,1-3.088-3.088A3.107,3.107,0,0,1,181.977,157.188Z" transform="translate(-174.035 -154.1)" fill="#fff"/>
            <path id="Path_11561" data-name="Path 11561" d="M178.641,161.871a1.471,1.471,0,1,1-1.471-1.471A1.475,1.475,0,0,1,178.641,161.871Z" transform="translate(-174.009 -155.767)" fill="#fff"/>
            <path id="Path_11562" data-name="Path 11562" d="M186.377,159.888a3.088,3.088,0,1,1-3.088-3.088A3.107,3.107,0,0,1,186.377,159.888Z" transform="translate(-175.2 -154.815)" fill="#fff"/>
            <path id="Path_11563" data-name="Path 11563" d="M189.53,160.765A1.765,1.765,0,1,1,187.765,159,1.742,1.742,0,0,1,189.53,160.765Z" transform="translate(-176.735 -155.397)" fill="#fff"/>
            <path id="Path_11564" data-name="Path 11564" d="M181.506,161.253a2.353,2.353,0,1,1-2.353-2.353A2.323,2.323,0,0,1,181.506,161.253Z" transform="translate(-174.3 -155.37)" fill="#fff"/>
          </g>
        </g>

        <g id="right-cloude" transform="translate(68.05 47.01)">
          <g id="Group_2805-2" data-name="Group 2805" transform="translate(57.136)">
            <circle id="Ellipse_344" data-name="Ellipse 344" cx="4.044" cy="4.044" r="4.044" transform="translate(0 8.456)" fill="#fff"/>
            <path id="Path_11556" data-name="Path 11556" d="M272.689,118.695a7.795,7.795,0,1,1-7.795-7.795A7.8,7.8,0,0,1,272.689,118.695Z" transform="translate(-252.688 -110.9)" fill="#fff"/>
            <path id="Path_11557" data-name="Path 11557" d="M264.1,130.35a3.75,3.75,0,1,1-3.75-3.75A3.766,3.766,0,0,1,264.1,130.35Z" transform="translate(-252.556 -115.055)" fill="#fff"/>
            <circle id="Ellipse_345" data-name="Ellipse 345" cx="7.795" cy="7.795" r="7.795" transform="translate(12.501 5)" fill="#fff"/>
            <circle id="Ellipse_346" data-name="Ellipse 346" cx="4.339" cy="4.339" r="4.339" transform="translate(23.457 9.045)" fill="#fff"/>
            <path id="Path_11558" data-name="Path 11558" d="M271.413,128.656a5.956,5.956,0,1,1-5.956-5.956A6.027,6.027,0,0,1,271.413,128.656Z" transform="translate(-253.323 -114.023)" fill="#fff"/>
          </g>
          <g id="Group_2807" data-name="Group 2807" transform="translate(113.537 18.972)">
            <path id="Path_11565" data-name="Path 11565" d="M354.1,149.235A3.236,3.236,0,1,0,357.335,146,3.264,3.264,0,0,0,354.1,149.235Z" transform="translate(-334.76 -139.161)" fill="#fff"/>
            <path id="Path_11566" data-name="Path 11566" d="M341.1,143.024a6.324,6.324,0,1,0,6.324-6.324A6.42,6.42,0,0,0,341.1,143.024Z" transform="translate(-331.32 -136.7)" fill="#fff"/>
            <path id="Path_11567" data-name="Path 11567" d="M350.4,152.415a3.015,3.015,0,1,0,3.015-3.015A2.982,2.982,0,0,0,350.4,152.415Z" transform="translate(-333.781 -140.061)" fill="#fff"/>
            <path id="Path_11568" data-name="Path 11568" d="M332.2,148.524a6.324,6.324,0,1,0,6.324-6.324A6.324,6.324,0,0,0,332.2,148.524Z" transform="translate(-328.964 -138.156)" fill="#fff"/>
            <path id="Path_11569" data-name="Path 11569" d="M327.8,150.23a3.53,3.53,0,1,0,3.53-3.53A3.484,3.484,0,0,0,327.8,150.23Z" transform="translate(-327.8 -139.347)" fill="#fff"/>
            <path id="Path_11570" data-name="Path 11570" d="M343.2,151.08a4.78,4.78,0,1,0,4.78-4.78A4.77,4.77,0,0,0,343.2,151.08Z" transform="translate(-331.876 -139.241)" fill="#fff"/>
          </g>
          <g id="surface1-3" data-name="surface1" transform="translate(109.912 -15.373)">
            <path id="Path_11698-3" data-name="Path 11698" d="M118.018,99.009A9.009,9.009,0,1,1,109.009,90,9.009,9.009,0,0,1,118.018,99.009Z" transform="translate(-93.641 -90)" fill="#fff"/>
            <path id="Path_11699-3" data-name="Path 11699" d="M134.838,257.419A7.419,7.419,0,1,1,127.419,250,7.419,7.419,0,0,1,134.838,257.419Z" transform="translate(-111.521 -233.042)" fill="#fff"/>
            <path id="Path_11700-3" data-name="Path 11700" d="M54.838,197.419A7.419,7.419,0,1,1,47.419,190,7.419,7.419,0,0,1,54.838,197.419Z" transform="translate(-40 -179.401)" fill="#fff"/>
            <path id="Path_11701-3" data-name="Path 11701" d="M332.718,196.359A6.359,6.359,0,1,1,326.359,190,6.359,6.359,0,0,1,332.718,196.359Z" transform="translate(-290.324 -179.401)" fill="#fff"/>
            <path id="Path_11702-3" data-name="Path 11702" d="M252.718,246.359A6.359,6.359,0,1,1,246.359,240,6.359,6.359,0,0,1,252.718,246.359Z" transform="translate(-218.803 -224.102)" fill="#fff"/>
            <path id="Path_11703-3" data-name="Path 11703" d="M253.778,126.889A6.889,6.889,0,1,1,246.889,120,6.889,6.889,0,0,1,253.778,126.889Z" transform="translate(-218.803 -116.82)" fill="#fff"/>
            <path id="Path_11704-3" data-name="Path 11704" d="M174.838,177.419A7.419,7.419,0,1,1,167.419,170,7.419,7.419,0,0,1,174.838,177.419Z" transform="translate(-147.282 -161.521)" fill="#fff"/>
          </g>
        </g>

        <g id="trees" transform="translate(59.808 148.793)">
          <g id="Group_2850" data-name="Group 2850" transform="translate(13.233 23.56)">
            <path id="Path_11663" data-name="Path 11663" d="M183.285,286.005a55.129,55.129,0,0,0-3.015,21.031c.368,4.633,2.353,7.795,4.412,7.5,1.838-.294,3.9-2.794,3.75-10.736-.147-8.015-1.691-15.074-2.794-17.8C184.756,283.358,184.241,283.5,183.285,286.005Z" transform="translate(-180.187 -284.074)" fill="#a4a4a4"/>
            <path id="Path_11664" data-name="Path 11664" d="M182.572,289.8a55.765,55.765,0,0,0-2.206,18.751c.368,4.633,2.353,7.795,4.412,7.5,1.691-.221,3.6-2.353,3.75-8.971C184.7,317.449,180.513,305.977,182.572,289.8Z" transform="translate(-180.209 -285.59)" fill="#cbcbcb"/>
            <g id="Group_2849" data-name="Group 2849" transform="translate(2.731 21.491)">
              <path id="Path_11665" data-name="Path 11665" d="M185.815,313.3l-.515,15.222h.882Z" transform="translate(-184.271 -313.3)" fill="#6b3704"/>
              <path id="Path_11666" data-name="Path 11666" d="M183.9,321.4l1.4,2.206.147-.882Z" transform="translate(-183.9 -315.444)" fill="#a35e1a"/>
              <path id="Path_11667" data-name="Path 11667" d="M186,319.9v.662l1.618-2.059Z" transform="translate(-184.456 -314.676)" fill="#6b3704"/>
            </g>
          </g>
          <g id="Group_2852" data-name="Group 2852" transform="translate(0 0)">
            <path id="Path_11668" data-name="Path 11668" d="M167.051,255.024c-4.633,12.28-5.221,26.178-4.706,32.943.515,7.206,3.677,12.28,6.912,11.765,2.868-.441,6.1-4.338,5.883-16.839s-2.721-23.6-4.339-27.943C169.33,250.906,168.521,251.2,167.051,255.024Z" transform="translate(-162.191 -252.035)" fill="#a4a4a4"/>
            <path id="Path_11669" data-name="Path 11669" d="M165.8,261a86.147,86.147,0,0,0-3.456,29.34c.515,7.206,3.677,12.28,6.912,11.765,2.647-.368,5.589-3.75,5.883-14.045C169.185,304.312,162.64,286.369,165.8,261Z" transform="translate(-162.193 -254.408)" fill="#cbcbcb"/>
            <g id="Group_2851" data-name="Group 2851" transform="translate(4.198 33.653)">
              <path id="Path_11670" data-name="Path 11670" d="M170.982,297.8l-.882,23.9h1.4Z" transform="translate(-168.482 -297.8)" fill="#6b3704"/>
              <path id="Path_11671" data-name="Path 11671" d="M167.9,310.6l2.28,3.456.147-1.4Z" transform="translate(-167.9 -301.188)" fill="#6b3704"/>
              <path id="Path_11672" data-name="Path 11672" d="M171.2,308.206v1.029L173.7,306Z" transform="translate(-168.773 -299.97)" fill="#6b3704"/>
            </g>
          </g>
          <g id="Group_2856" data-name="Group 2856" transform="translate(108.64 0.01)">
            <path id="Path_11678" data-name="Path 11678" d="M322.851,255.028c-12.28,12.28-13.9,26.178-12.5,33.017,1.471,7.206,9.854,12.28,18.531,11.766,7.721-.441,16.4-4.339,15.663-16.839s-7.206-23.6-11.545-27.943C328.88,250.91,326.748,251.2,322.851,255.028Z" transform="translate(-309.932 -252.049)" fill="#a4a4a4"/>
            <path id="Path_11679" data-name="Path 11679" d="M319.616,261c-9.339,11.324-10.515,23.237-9.265,29.414,1.471,7.206,9.854,12.28,18.531,11.765,7.059-.368,15-3.75,15.663-14.045C328.661,304.312,311.16,286.369,319.616,261Z" transform="translate(-309.934 -254.418)" fill="#cbcbcb"/>
            <g id="Group_2855" data-name="Group 2855" transform="translate(10.933 27.172)">
              <path id="Path_11680" data-name="Path 11680" d="M333.45,289l-1.25,34.782h2.059Z" transform="translate(-326.758 -289)" fill="#6b3704"/>
              <path id="Path_11681" data-name="Path 11681" d="M324.8,302.3l6.324,8.971.221-1.985Z" transform="translate(-324.8 -292.52)" fill="#6b3704"/>
              <path id="Path_11682" data-name="Path 11682" d="M333.7,304.03v1.544l6.471-5.074Z" transform="translate(-327.155 -292.044)" fill="#6b3704"/>
            </g>
          </g>
          <g id="Group_2860" data-name="Group 2860" transform="translate(132.499 29.626)">
            <path id="Path_11688" data-name="Path 11688" d="M350.336,294.145c-7.574,7.574-8.53,16.1-7.721,20.222.882,4.412,6.03,7.574,11.4,7.28,4.706-.294,10.074-2.647,9.633-10.368s-4.412-14.486-7.133-17.133C354.086,291.645,352.762,291.792,350.336,294.145Z" transform="translate(-342.378 -292.324)" fill="#a4a4a4"/>
            <path id="Path_11689" data-name="Path 11689" d="M348.364,297.8c-5.736,6.986-6.471,14.266-5.662,18.089.882,4.412,6.03,7.574,11.4,7.28,4.339-.221,9.192-2.28,9.633-8.6C353.879,324.419,343.216,313.389,348.364,297.8Z" transform="translate(-342.391 -293.774)" fill="#cbcbcb"/>
            <g id="Group_2859" data-name="Group 2859" transform="translate(6.708 16.748)">
              <path id="Path_11690" data-name="Path 11690" d="M356.835,315.1l-.735,15.589h1.25Z" transform="translate(-352.717 -315.1)" fill="#6b3704"/>
              <path id="Path_11691" data-name="Path 11691" d="M351.5,323.2l3.9,5.515.147-1.25Z" transform="translate(-351.5 -317.244)" fill="#6b3704"/>
              <path id="Path_11692" data-name="Path 11692" d="M357,324.306v.956l3.971-3.162Z" transform="translate(-352.956 -316.953)" fill="#6b3704"/>
            </g>
          </g>
          <g id="Group_2862" data-name="Group 2862" transform="translate(4.204 42.081)">
            <path id="Path_11693" data-name="Path 11693" d="M172.851,310.393c-4.633,4.633-5.221,9.927-4.706,12.5.515,2.721,3.75,4.633,6.986,4.486,2.941-.147,6.177-1.618,5.883-6.4a18.484,18.484,0,0,0-4.339-10.589C175.057,308.849,174.248,308.922,172.851,310.393Z" transform="translate(-167.93 -309.262)" fill="#a4a4a4"/>
            <path id="Path_11694" data-name="Path 11694" d="M171.579,312.6c-3.53,4.265-3.971,8.824-3.53,11.1.515,2.721,3.75,4.633,6.986,4.486,2.647-.147,5.662-1.4,5.883-5.294C174.961,329,168.343,322.233,171.579,312.6Z" transform="translate(-167.908 -310.146)" fill="#cbcbcb"/>
            <g id="Group_2861" data-name="Group 2861" transform="translate(4.112 10.249)">
              <path id="Path_11695" data-name="Path 11695" d="M176.815,323.2l-.515,9.633h.809Z" transform="translate(-174.241 -323.2)" fill="#6b3704"/>
              <path id="Path_11696" data-name="Path 11696" d="M173.5,328.3l2.427,3.383.074-.809Z" transform="translate(-173.5 -324.55)" fill="#6b3704"/>
              <path id="Path_11697" data-name="Path 11697" d="M176.9,328.924v.588l2.427-1.912Z" transform="translate(-174.4 -324.365)" fill="#6b3704"/>
            </g>
          </g>
        </g>
      </g>

      <path id="Path_11705" data-name="Path 11705" d="M410.087,327.724c-13.489,0-204.437.18-222.1.18.1-12.625.1-2.318.052-14.546s-.017-11.865,0-20.562c22-5.132,35.753,6.16,57.93,5.17s12.619-4.174,32.717-5.05c17.85-.778,59.93,5.05,70.668,5.05,26.405,0,51.941-12.865,60.735-5.245Z" transform="translate(-181.403 -73.195)" fill="url(#linear-gradient)"/>
    </g>
  </g>
</svg>

      </div>
    </div>
    <!-- <q-img
      v-if="show"
      contain
      style="width: 100%; height: auto"
      class="absolute-bottom"
      src="statics/images/nav-bg.png"
    /> -->
  </transition>
</template>
<script>
export default {
  props: ['show'],
  methods: {
    onShowing () {
      this.$anime
        .timeline()
        .add({
          targets: '#apartment',
          translateX: [3.265],
          translateY: [170.938, 71.938],
          easing: 'easeOutQuad',
          duration: 700,
          delay: 400
        })
      // translate(3.265px ,170.938px)

      this.$anime
        .timeline()
        .add({
          targets: '#surface1-3',
          translateX: [200.912, 90],
          translateY: [-15.373],
          easing: 'easeOutQuad',
          duration: 700,
          delay: 400
        })
        // translate(109.912 -15.373)

      this.$anime
        .timeline()
        .add({
          targets: '#surface1',
          translateX: [29.628, 69.628],
          translateY: [6.027],
          easing: 'easeOutQuad',
          duration: 700,
          delay: 400
        })
        // translate(69.628 6.027)

      this.$anime
        .timeline()
        .add({
          targets: '#Group_2805-2',
          translateX: [10, 57.136],
          easing: 'easeOutQuad',
          duration: 700,
          delay: 400
        })
        // translate(57.136)
    }
  },
  computed () {
    if (this.show) {
      this.onShowing()
    }
  },
  mounted () {
    if (this.show) {
      this.onShowing()
    }
  }
}
</script>
<style>
/* .sidebar-image-enter-active,
.sidebar-image-leave-active {
  -webkit-animation: slide-fwd-center 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-fwd-center 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.sidebar-image-enter, .sidebar-image-leave-to {
  -webkit-animation: fade-out-bck 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: fade-out-bck 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
} */
</style>
