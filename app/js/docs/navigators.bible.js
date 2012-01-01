/**
 * All the functions necessary to navigate a Bible
 * @requires bible.BibleFormatter
 *
 * @author John Dyer (http://j.hn/)
 */

bible.BibleNavigator = {
	
	name: 'bible',
	
	sectionSelector: 'div.chapter',
	
	sectionIdAttr: 'data-osis',
	
	fragmentSelector: 'span.verse',
	
	fragmentIdAttr: 'data-osis',
	
	getOptions: function() {
		var html = '',
			langCode,
			language,
			versionCode,
			version;
		
		for (langCode in bible.versions) {
			language = bible.versions[langCode];
			
			html += '<optgroup label="' + language.languageName + '">';
			
			for (versionCode in language.versions) {
				version = language.versions[versionCode];
				
				html += '<option value="' + versionCode + '">' + version.abbreviation + ' - ' + version.name + '</option>';
				
			}
			
			html += '</optgroup>';
		}
	
		return html;
	},
	
	formatNavigation: function(fragmentId) {
		return bible.BibleFormatter.verseCodeToReferenceString(fragmentId, 0);
	},
	
	findFragment: function(fragmentId, content) {
		return content.find('span.verse[data-osis=' + fragmentId + ']');
	},
	
	parseString: function(input) {
		var reference = new bible.Reference(input);
		
		if (reference != null) {
			return reference.toVerseCode();
		} else {
			return null;
		}
	},
	
	convertFragmentIdToSectionId: function(fragmentId) {
		
		//
		var parts = fragmentId.split('.'),
			chapter = parts[0] + '.' + parts[1];
			
		
		return chapter;
	},
	
	getNextSectionId: function(sectionId) {
		
		return bible.BibleFormatter.getNextChapterCode(sectionId);
	},
	
	getPrevSectionId: function(sectionId) {
		
		return bible.BibleFormatter.getPrevChapterCode(sectionId);
	}	
	
};