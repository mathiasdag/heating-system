import React from 'react';
import {
  Heading,
  PageTitle,
  ArticleTitle,
  SectionHeading,
  SubsectionHeading,
  CardTitle,
  SmallTitle,
  BuildingTitle,
  Label,
} from '@/components/headings';

/**
 * Example component demonstrating the heading system
 * Use this as a reference for implementing headings in your components
 */
export default function HeadingExamples() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">Heading System Examples</h2>

        {/* Page Title Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Page Titles</h3>
          <div className="p-6 bg-surface rounded-lg">
            <PageTitle>Welcome to Värmeverket</PageTitle>
            <ArticleTitle>Latest News from Our Community</ArticleTitle>
          </div>
        </section>

        {/* Section Heading Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Section Headings</h3>
          <div className="p-6 bg-surface rounded-lg space-y-4">
            <SectionHeading>Our Services</SectionHeading>
            <SubsectionHeading>Workshop Details</SubsectionHeading>
            <SubsectionHeading>Event Information</SubsectionHeading>
          </div>
        </section>

        {/* Card Title Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Card Titles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-surface rounded-lg">
              <CardTitle>Event Information</CardTitle>
              <p className="mt-2 text-sm">Card content goes here...</p>
            </div>
            <div className="p-6 bg-surface rounded-lg">
              <CardTitle>Workshop Details</CardTitle>
              <p className="mt-2 text-sm">More card content...</p>
            </div>
          </div>
        </section>

        {/* Building Title Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Building Titles</h3>
          <div className="p-6 bg-surface rounded-lg space-y-4">
            <BuildingTitle>Workshop Room A</BuildingTitle>
            <BuildingTitle as="h2">Main Hall</BuildingTitle>
            <BuildingTitle as="h3">Creative Studio</BuildingTitle>
          </div>
        </section>

        {/* Small Title Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Small Titles & Labels</h3>
          <div className="p-6 bg-surface rounded-lg space-y-4">
            <SmallTitle>Quick Links</SmallTitle>
            <Label>Category: Events</Label>
            <Label>Date: January 2025</Label>
          </div>
        </section>

        {/* Custom Styling Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Custom Styling</h3>
          <div className="p-6 bg-surface rounded-lg space-y-4">
            <Heading
              variant="section"
              className="text-accent border-b-2 border-accent pb-2"
            >
              Custom Styled Section
            </Heading>

            <Heading variant="subsection" center className="text-center">
              Centered Subsection
            </Heading>

            <Heading
              variant="card-title"
              uppercase={false}
              className="normal-case"
            >
              Normal Case Card Title
            </Heading>
          </div>
        </section>

        {/* Size Override Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Size Overrides</h3>
          <div className="p-6 bg-surface rounded-lg space-y-4">
            <Heading variant="section" size="sm">
              Small Section
            </Heading>
            <Heading variant="section" size="md">
              Medium Section
            </Heading>
            <Heading variant="section" size="lg">
              Large Section
            </Heading>
            <Heading variant="section" size="xl">
              Extra Large Section
            </Heading>
          </div>
        </section>

        {/* Semantic Override Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Semantic Overrides</h3>
          <div className="p-6 bg-surface rounded-lg space-y-4">
            <Heading variant="section" as="h1">
              Section as H1
            </Heading>
            <Heading variant="subsection" as="h2">
              Subsection as H2
            </Heading>
            <Heading variant="card-title" as="h4">
              Card Title as H4
            </Heading>
          </div>
        </section>

        {/* Real-world Usage Examples */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Real-world Usage</h3>
          <div className="p-6 bg-surface rounded-lg space-y-6">
            {/* Page Layout Example */}
            <div>
              <PageTitle>About Värmeverket</PageTitle>
              <p className="mt-4 text-lg">
                We are a creative hub in Stockholm...
              </p>

              <SectionHeading className="mt-8">Our Mission</SectionHeading>
              <p className="mt-4">To support creators and entrepreneurs...</p>

              <SubsectionHeading className="mt-6">
                Community Impact
              </SubsectionHeading>
              <p className="mt-4">We believe in the power of community...</p>
            </div>

            {/* Card Layout Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-surface-dark rounded-lg">
                <CardTitle>Workshops</CardTitle>
                <SmallTitle className="mt-2">Creative Skills</SmallTitle>
                <p className="mt-4 text-sm">
                  Learn new skills in our workshops...
                </p>
                <Label className="mt-4 block">Next: January 15</Label>
              </div>

              <div className="p-6 bg-surface-dark rounded-lg">
                <CardTitle>Events</CardTitle>
                <SmallTitle className="mt-2">Community Gatherings</SmallTitle>
                <p className="mt-4 text-sm">Join our community events...</p>
                <Label className="mt-4 block">Weekly: Fridays</Label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
