---
title: 'Form'
page_type: "basic"
description: 'Here is a sample of some basic Markdown syntax that can be used when writing Markdown content in Astro.'
pubDate: 'Jun 19 2024'
heroImage: '/blog-placeholder-1.jpg'
---

// i frame javascript variables pass in from JSON ?

// iframe include for thigns?

<form>
	<p>Intro Text or Paragraph Text above an form group</p>
	<div class="row">
		<input type="text"/>
		<!-- adf -->
		<button type="submit">Submit</button>
	</div>
</form>

<form>
    <div>
      <label for="textInput">Text Input</label>
      <input type="text" id="textInput" name="textInput" placeholder="Enter text here" />
      <button type="submit">Go</button>
    </div>
    <hr/>
    <div>
      <label for="emailInput">Email Input</label>
      <input type="email" id="emailInput" name="emailInput" placeholder="Enter your email" />
    </div>
    <div>
      <label for="passwordInput">Password Input</label>
      <input type="password" id="passwordInput" name="passwordInput" placeholder="Enter your password" />
    </div>
    <div>
      <label for="textarea">Textarea:</label>
      <textarea id="textarea" name="textarea" rows="4" placeholder="Enter additional information"></textarea>
    </div>
    <div>
      <fieldset>
        <legend>Checkbox Options:</legend>
        <div>
          <label>
            <input type="checkbox" id="option1" name="checkboxOptions" value="option1" /> Option 1
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" id="option2" name="checkboxOptions" value="option2" /> Option 2
          </label>
        </div>
      </fieldset>
    </div>
    <div>
      <fieldset>
        <legend>Radio Options:</legend>
        <div>
          <label>
            <input type="radio" id="radioOption1" name="radioOption" value="option1" /> Option 1
          </label>
        </div>
        <div>
          <label>
            <input type="radio" id="radioOption2" name="radioOption" value="option2" /> Option 2
          </label>
        </div>
      </fieldset>
    </div>
    <div>
      <label for="selectInput">Select Input:</label>
      <select id="selectInput" name="selectInput">
        <option value="">Choose an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
</form>