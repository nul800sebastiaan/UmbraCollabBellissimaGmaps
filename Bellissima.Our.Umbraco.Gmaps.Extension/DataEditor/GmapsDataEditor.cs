using Umbraco.Cms.Core.PropertyEditors;

namespace Our.Umbraco.GMaps.Core;

[DataEditor(Constants.MapPropertyAlias, ValueType = ValueTypes.Json, ValueEditorIsReusable = true)]
public class GmapsDataEditor : DataEditor
{
    public GmapsDataEditor(IDataValueEditorFactory dataValueEditorFactory)
        : base(dataValueEditorFactory)
    {
    }
}